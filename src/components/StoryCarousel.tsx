import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";

const stories = [
  { id: "1", title: "Luna’s Lost Shapes", cover: "https://picsum.photos/300" },
  { id: "2", title: "Jungle Adventure", cover: "https://picsum.photos/301" },
  { id: "3", title: "Space Explorers", cover: "https://picsum.photos/302" },
  { id: "4", title: "Ocean Mystery", cover: "https://picsum.photos/303" },
];

export default function StoryCarousel() {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <Text style={styles.title}>Explore Stories 📚</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {stories.map((story) => (
          <TouchableOpacity
            key={story.id}
            onPress={() => console.log("Story Selected:", story.title)}
          >
            <Image source={{ uri: story.cover }} style={styles.storyImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 5,
    textAlign: "center",
  },
  scrollContainer: {
    paddingLeft: 10,
  },
  storyImage: {
    width: 180,
    height: 220,
    marginRight: 15,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#FFD700",
  },
});
