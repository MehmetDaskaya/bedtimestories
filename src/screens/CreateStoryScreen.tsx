import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  IconButton,
  Card,
  useTheme,
  Portal,
  Dialog,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { MainScreenProps } from "../navigation/types";
import AppHeader from "../components/AppHeader";

const { width } = Dimensions.get("window");

type CreationMethod = "ai" | "manual" | "template" | null;
type CreationStep = "method" | "details" | "content";

interface StoryPage {
  id: string;
  text: string;
  imageUri: string;
}

interface StoryTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  pages: number;
}

const templates: StoryTemplate[] = [
  {
    id: "1",
    title: "Adventure Quest",
    description: "A hero's journey through magical lands",
    icon: "sword",
    pages: 10,
  },
  {
    id: "2",
    title: "Bedtime Story",
    description: "Gentle tales for peaceful dreams",
    icon: "moon-waning-crescent",
    pages: 5,
  },
  {
    id: "3",
    title: "Animal Friends",
    description: "Stories about furry companions",
    icon: "dog",
    pages: 8,
  },
];

const PROMPT_COST = 50; // coins per story generation
const MOCK_USER_COINS = 100; // mock user's coin balance

const promptGuidelines = [
  {
    title: "Age-Appropriate",
    description: "Specify the target age group (e.g., 'for 5-7 year olds')",
    example: "Create a bedtime story for 5-7 year olds about...",
  },
  {
    title: "Theme & Values",
    description: "Include the main theme and values you want to teach",
    example: "...about friendship and sharing that teaches kindness",
  },
  {
    title: "Characters",
    description: "Describe main characters and their key traits",
    example: "...featuring a shy butterfly who learns to be brave",
  },
  {
    title: "Setting",
    description: "Set the scene and atmosphere",
    example: "...in a magical garden during springtime",
  },
];

export default function CreateStoryScreen({
  navigation,
}: MainScreenProps<"Create">) {
  const theme = useTheme();
  const [creationMethod, setCreationMethod] = useState<CreationMethod>(null);
  const [currentStep, setCurrentStep] = useState<CreationStep>("method");
  const [selectedTemplate, setSelectedTemplate] =
    useState<StoryTemplate | null>(null);
  const [showPromptGuide, setShowPromptGuide] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [currentGuideStep, setCurrentGuideStep] = useState(0);

  // Story details state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [targetAge, setTargetAge] = useState("");
  const [pages, setPages] = useState<StoryPage[]>([
    { id: "1", text: "", imageUri: "https://picsum.photos/400/300" },
  ]);

  const addNewPage = () => {
    const newPage: StoryPage = {
      id: (pages.length + 1).toString(),
      text: "",
      imageUri: `https://picsum.photos/400/300?random=${pages.length + 1}`,
    };
    setPages([...pages, newPage]);
  };

  const updatePageText = (id: string, newText: string) => {
    setPages(
      pages.map((page) => (page.id === id ? { ...page, text: newText } : page))
    );
  };

  const deletePage = (id: string) => {
    if (pages.length > 1) {
      setPages(pages.filter((page) => page.id !== id));
    } else {
      Alert.alert("Cannot Delete", "Story must have at least one page");
    }
  };

  const handleSave = () => {
    Alert.alert(
      "Story Saved!",
      `Created "${title}" by ${author} with ${pages.length} pages using ${creationMethod} method`
    );
  };

  // Mock function to generate story from AI
  const generateStoryFromAI = () => {
    if (MOCK_USER_COINS < PROMPT_COST) {
      Alert.alert(
        "Insufficient Coins",
        `You need ${PROMPT_COST} coins to generate a story. Current balance: ${MOCK_USER_COINS}`
      );
      return;
    }

    // Mock story generation
    Alert.alert(
      "Story Generated!",
      "Your story has been created from the prompt. Cost: 50 coins",
      [
        {
          text: "OK",
          onPress: () => setCurrentStep("content"),
        },
      ]
    );
  };

  const renderPromptGuideModal = () => (
    <Portal>
      <Dialog
        visible={showPromptGuide}
        onDismiss={() => setShowPromptGuide(false)}
      >
        <Dialog.Title>How to Write a Great Story Prompt</Dialog.Title>
        <Dialog.ScrollArea style={{ maxHeight: 400 }}>
          <ScrollView>
            {promptGuidelines.map((guide, index) => (
              <View
                key={index}
                style={[
                  styles.guideStep,
                  currentGuideStep === index && styles.activeGuideStep,
                ]}
              >
                <Text style={styles.guideTitle}>{guide.title}</Text>
                <Text style={styles.guideDescription}>{guide.description}</Text>
                <Text style={styles.guideExample}>
                  Example: {guide.example}
                </Text>
              </View>
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={() => setShowPromptGuide(false)}>Got it!</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  const renderAIPromptSection = () => (
    <View style={styles.promptContainer}>
      <View style={styles.coinBalance}>
        {/* <MaterialCommunityIcons name="currency-usd" size={24} color="#FFD700" /> */}
        <Text style={styles.coinText}>{MOCK_USER_COINS} coins</Text>
      </View>

      <Button
        mode="outlined"
        onPress={() => setShowPromptGuide(true)}
        style={styles.guideButton}
        icon="help-circle"
      >
        How to Write a Good Prompt
      </Button>

      <TextInput
        label="Your Story Prompt"
        value={prompt}
        onChangeText={setPrompt}
        style={styles.promptInput}
        mode="outlined"
        multiline
        numberOfLines={4}
        placeholder="Describe the story you want to create..."
      />

      <View style={styles.costContainer}>
        <Text style={styles.costText}>Cost: {PROMPT_COST} coins</Text>
        <Button
          mode="contained"
          onPress={generateStoryFromAI}
          disabled={!prompt.trim()}
          style={styles.generateButton}
          icon="magic"
        >
          Generate Story
        </Button>
      </View>
    </View>
  );

  const renderMethodSelection = () => (
    <View style={styles.methodContainer}>
      <AppHeader title="Create Story" />
      <View style={styles.methodGrid}>
        <TouchableOpacity
          style={[
            styles.methodCard,
            creationMethod === "ai" && styles.selectedMethod,
          ]}
          onPress={() => setCreationMethod("ai")}
        >
          {/* <MaterialCommunityIcons
            name="robot"
            size={40}
            color={theme.colors.primary}
          /> */}
          <Text style={styles.methodTitle}>Create with AI</Text>
          <Text style={styles.methodDescription}>
            Let AI help you generate story ideas and content
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodCard,
            creationMethod === "template" && styles.selectedMethod,
          ]}
          onPress={() => setCreationMethod("template")}
        >
          {/* <MaterialCommunityIcons
            name="book-open-variant"
            size={40}
            color={theme.colors.primary}
          /> */}
          <Text style={styles.methodTitle}>Use Template</Text>
          <Text style={styles.methodDescription}>
            Start with a pre-made story structure
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.methodCard,
            creationMethod === "manual" && styles.selectedMethod,
          ]}
          onPress={() => setCreationMethod("manual")}
        >
          {/* <MaterialCommunityIcons
            name="pencil"
            size={40}
            color={theme.colors.primary}
          /> */}
          <Text style={styles.methodTitle}>Create Yourself</Text>
          <Text style={styles.methodDescription}>
            Write your story from scratch with full creative control
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={() => setCurrentStep("details")}
        style={styles.nextButton}
        disabled={!creationMethod}
      >
        Next Step
      </Button>
    </View>
  );

  const renderTemplateSelection = () => (
    <View style={styles.templateContainer}>
      <Text style={styles.header}>Choose a Template</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {templates.map((template) => (
          <Card
            key={template.id}
            style={[
              styles.templateCard,
              selectedTemplate?.id === template.id && styles.selectedTemplate,
            ]}
            onPress={() => setSelectedTemplate(template)}
          >
            <Card.Content>
              {/* <MaterialCommunityIcons
                name={template.icon as any}
                size={40}
                color={theme.colors.primary}
              /> */}
              <Text style={styles.templateTitle}>{template.title}</Text>
              <Text style={styles.templateDescription}>
                {template.description}
              </Text>
              <Text style={styles.templatePages}>{template.pages} pages</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );

  const renderStoryDetails = () => (
    <View style={styles.detailsContainer}>
      <AppHeader title="Story Details" />
      {creationMethod === "ai" ? (
        renderAIPromptSection()
      ) : (
        <>
          <TextInput
            label="Story Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Author Name"
            value={author}
            onChangeText={setAuthor}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Target Age Group"
            value={targetAge}
            onChangeText={setTargetAge}
            style={styles.input}
            mode="outlined"
            placeholder="e.g., 3-6 years"
          />

          {creationMethod === "template" && renderTemplateSelection()}
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => setCurrentStep("method")}
          style={styles.backButton}
        >
          Back
        </Button>
        <Button
          mode="contained"
          onPress={() => setCurrentStep("content")}
          style={styles.nextButton}
          disabled={!title || !author}
        >
          Next Step
        </Button>
      </View>
    </View>
  );

  const renderContentCreation = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.header}>Create Your Story</Text>
      {pages.map((page, index) => (
        <View key={page.id} style={styles.pageContainer}>
          <View style={styles.pageHeader}>
            <Text style={styles.pageNumber}>Page {index + 1}</Text>
            <IconButton
              icon="delete"
              size={24}
              onPress={() => deletePage(page.id)}
            />
          </View>

          <TouchableOpacity style={styles.imageContainer}>
            <Image source={{ uri: page.imageUri }} style={styles.pageImage} />
            <Text style={styles.uploadText}>Tap to change image</Text>
          </TouchableOpacity>

          <TextInput
            label="Page Text"
            value={page.text}
            onChangeText={(text) => updatePageText(page.id, text)}
            style={styles.pageText}
            multiline
            numberOfLines={3}
            mode="outlined"
          />
        </View>
      ))}

      <Button
        mode="contained"
        onPress={addNewPage}
        style={styles.addButton}
        icon="plus"
      >
        Add New Page
      </Button>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => setCurrentStep("details")}
          style={styles.backButton}
        >
          Back
        </Button>
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          disabled={pages.some((page) => !page.text)}
        >
          Save Story
        </Button>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {renderPromptGuideModal()}
      {currentStep === "method" && renderMethodSelection()}
      {currentStep === "details" && renderStoryDetails()}
      {currentStep === "content" && renderContentCreation()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  methodContainer: {
    flex: 1,
  },
  methodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  methodCard: {
    width: width * 0.43,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  selectedMethod: {
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
    textAlign: "center",
  },
  methodDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  templateContainer: {
    marginVertical: 20,
  },
  templateCard: {
    width: width * 0.7,
    marginRight: 16,
    elevation: 3,
  },
  selectedTemplate: {
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  templateDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  templatePages: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4A4A4A",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  pageContainer: {
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  pageImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  uploadText: {
    color: "#666",
    fontSize: 14,
  },
  pageText: {
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
  },
  nextButton: {
    flex: 1,
    marginLeft: 8,
  },
  addButton: {
    marginVertical: 16,
    backgroundColor: "#4CAF50",
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#2196F3",
  },
  promptContainer: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginBottom: 20,
  },
  coinBalance: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  coinText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#666",
  },
  guideButton: {
    marginBottom: 16,
  },
  promptInput: {
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  costContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  costText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  generateButton: {
    backgroundColor: "#4CAF50",
  },
  guideStep: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  activeGuideStep: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196F3",
    borderWidth: 1,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  guideDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  guideExample: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#2196F3",
  },
});
