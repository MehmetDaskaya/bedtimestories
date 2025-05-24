import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  ImageBackground,
} from "react-native";
import {
  IconButton,
  Title,
  Paragraph,
  Provider as PaperProvider,
  DefaultTheme,
  Portal,
  Modal,
} from "react-native-paper";

import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/types"; // Adjust the path if needed
import storyData from "../data/data.json"; // Import the JSON directly

// Get screen dimensions for responsive design
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Custom theme with kid-friendly fonts and colors
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF4785",
    accent: "#5252FF",
    background: "#FFFFFF",
    text: "#333333",
  },
  // Use the font configuration format that matches the React Native Paper version you're using
  // This is a simplified version that should work with most recent versions
  fonts: {
    ...DefaultTheme.fonts,
    // Optionally override specific font styles if needed
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: "Roboto-Regular",
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: "Roboto-Medium",
    },
  },
};

// Format large numbers with K, M suffixes
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Props for BookItem component
interface BookItemProps {
  item: Story;
  isFavorited: boolean;
  isSaved: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleSave: (id: string) => void;
  onPressOpen: (book: Story) => void;
}

// Book Item Component
const BookItem: React.FC<BookItemProps> = ({
  item,
  isFavorited,
  isSaved,
  onToggleFavorite,
  onToggleSave,
  onPressOpen,
}) => {
  const insets = useSafeAreaInsets();

  // Generate star rating display
  const renderStars = (rating: number) => {
    const starIcons = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starIcons.push(
          <FontAwesome key={i} name="star" size={16} color="#FFD700" />
        );
      } else if (i === fullStars && halfStar) {
        starIcons.push(
          <FontAwesome key={i} name="star-half-o" size={16} color="#FFD700" />
        );
      } else {
        starIcons.push(
          <FontAwesome key={i} name="star-o" size={16} color="#FFD700" />
        );
      }
    }

    return (
      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>{starIcons}</View>
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  // Animation for book cover
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    onPressOpen(item);
  };
  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <ImageBackground
          source={{ uri: item.coverImage }}
          style={styles.bookContainer}
        >
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            style={styles.touchableFullArea}
          />
          <View style={styles.overlay} />
          <View
            style={[
              styles.bookContentContainer,
              { paddingBottom: insets.bottom + 10 },
            ]}
          >
            {/* Left side: Book cover and details */}
            <View style={styles.bookMainContent}>
              <View style={styles.badgeWrapper}>
                <View style={styles.badgeContainer}>
                  <View style={styles.durationBadge}>
                    <Ionicons name="time-outline" size={14} color="white" />
                    <Text style={styles.durationText}>{item.duration}</Text>
                  </View>
                  <View style={styles.ageBadge}>
                    <Text style={styles.ageText}>
                      For {item.ageRange} Year Olds
                    </Text>
                  </View>
                </View>

                {/* Page count below badges */}
                <View style={styles.pageBadge}>
                  <Ionicons name="book-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.pageText}>{item.pages.length} pages</Text>
                </View>
                {/* Categories */}
                <View style={styles.pageBadge}>
                  <Ionicons name="pricetag-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.pageText}>
                    {item.categories.join(", ")}
                  </Text>
                </View>
              </View>

              <View style={styles.bookDetails}>
                <Title style={styles.bookTitle}>{item.title}</Title>
                <Paragraph style={styles.bookAuthor}>
                  By {item.author}
                </Paragraph>
                <Text style={styles.bookDescription} numberOfLines={2}>
                  {item.description}
                </Text>

                <View style={styles.statsContainer}>
                  {renderStars(item.rating)}
                  <View style={styles.readStats}>
                    <Ionicons name="eye-outline" size={16} color="#666" />
                    <Text style={styles.statsText}>
                      {formatNumber(item.reads)} reads
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Right side: Interaction buttons */}
            <View style={styles.interactionContainer}>
              <IconButton
                icon={isFavorited ? "heart" : "heart-outline"}
                iconColor={isFavorited ? theme.colors.primary : "#D3D3D3"}
                size={32}
                onPress={() => onToggleFavorite(item.id)}
              />
              <Text style={styles.interactionText}>
                {isFavorited ? "Favorite!" : item.likes + " Likes"}
              </Text>

              <IconButton icon="share-variant" iconColor="#D3D3D3" size={32} />
              <Text style={styles.interactionText}>Share</Text>

              <IconButton
                icon={isSaved ? "bookmark" : "bookmark-outline"}
                iconColor={isSaved ? theme.colors.primary : "#D3D3D3"}
                size={32}
                onPress={() => onToggleSave(item.id)}
              />
              <Text style={styles.interactionText}>
                {isSaved ? "Saved!" : "Save"}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, "Home">;

interface StoryPage {
  pageNumber: number;
  imageUrl: string;
  text: string;
  audioTimestamp: number;
  audioUrl?: string; // ✅ optional, allows flexibility
}

interface Story {
  id: string;
  title: string;
  coverImage: string;
  author: string;
  description: string;
  rating: number;
  reads: number;
  duration: string;
  ageRange: string;
  audioUrl?: string;
  pages: StoryPage[];
  likes: number;
  categories: string[];
}

// Main component
export default function HomeScreen({
  navigation,
}: HomeScreenProps): React.ReactElement {
  const [stories, setStories] = useState<Story[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);

  // Flat list reference to scroll programmatically
  const flatListRef = useRef<FlatList<Story>>(null);

  useEffect(() => {
    const formattedStories = storyData.stories; // ✅ Keep full pages array
    setStories(formattedStories);
  }, []);

  const handlePressOpen = (book: Story) => {
    navigation.navigate("StoryPage", {
      bookId: book.id,
      mode: "open",
    });
  };

  // Toggle favorite status
  const handleToggleFavorite = (bookId: string) => {
    setFavorites((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const handleToggleSave = (bookId: string) => {
    setSaved((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  // Render each book item
  const renderItem = ({ item }: { item: Story }) => (
    <BookItem
      item={item}
      isFavorited={favorites[item.id] || false}
      isSaved={saved[item.id] || false}
      onToggleFavorite={handleToggleFavorite}
      onToggleSave={handleToggleSave}
      onPressOpen={handlePressOpen}
    />
  );

  return (
    <PaperProvider theme={theme}>
      <AppHeader
        title="Bedtime Stories"
        onBookmarkPress={() => setShowModal(true)}
      />

      <View style={styles.container}>
        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => setShowModal(false)}
            contentContainerStyle={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Saved Stories
              </Text>
              <IconButton icon="close" onPress={() => setShowModal(false)} />
            </View>
            <FlatList
              data={stories.filter((story) => saved[story.id])}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 16 }}>{item.title}</Text>
                  <Text style={{ color: "#888" }}>By {item.author}</Text>
                </View>
              )}
            />
          </Modal>
        </Portal>
        <FlatList
          ref={flatListRef}
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false} // Hide scrollbar for cleaner look
          snapToInterval={SCREEN_HEIGHT} // Snap one story per screen
          snapToAlignment="start"
          decelerationRate="fast"
          pagingEnabled
          onEndReached={() => console.log("End reached")}
          onEndReachedThreshold={0.1}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  touchableFullArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  storyItem: { marginBottom: 10 },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.6,
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  bookContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  bookContentContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bookMainContent: {
    flex: 5,
    paddingRight: 10,
    justifyContent: "flex-end",
    paddingBottom: 80,
  },

  coverImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  badgeWrapper: {
    position: "absolute",
    top: 70,
    left: 0,
    alignItems: "flex-start", // Aligns all elements to the left
  },

  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 16,
    paddingVertical: 6,

    gap: 8, // Space between badges
  },

  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  durationText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },

  ageBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  ageText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  pageBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6, // Creates spacing below the badges
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start", // Ensures it doesn't stretch
  },

  pageText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },

  bookDetails: {
    paddingTop: 5,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFFFFF",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#D3D3D3",
    marginBottom: 8,
  },
  bookDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 10,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  starsContainer: {
    flexDirection: "row",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#FFFFFF",
  },
  readStats: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  pagesStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#FFFFFF",
  },

  interactionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 5,
    paddingBottom: 120,
  },
  interactionText: {
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: -5,
    marginBottom: 15,
  },
});
