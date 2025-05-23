import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Button } from "react-native-paper";

export default function FeaturedStories() {
  return (
    <View style={styles.container}>
      {/* Story Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://picsum.photos/500" }}
          style={styles.storyImage}
        />
      </View>

      {/* Story Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.storyTitle}>Cosmic Quest</Text>
        <Text style={styles.pageCount}>📖 29 Pages</Text>
        <Text style={styles.genre}>✨ Space Adventure</Text>

        {/* Read Now Button */}

        <Button mode="contained" style={styles.readButton}>
          📖 Read
        </Button>

        {/* Action Buttons */}

        <Button mode="contained" style={styles.listenButton}>
          🎵 Listen
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEB", // Soft warm background
    padding: 15,
    borderRadius: 20, // Rounded corners
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: "#FFD700", // Gold accent border
  },
  imageContainer: {
    flex: 1.2,
    borderRadius: 15,
    overflow: "hidden",
  },
  storyImage: {
    width: "100%",
    height: 170,
    borderRadius: 15,
  },
  detailsContainer: {
    flex: 2,
    paddingLeft: 15,
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  pageCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  genre: {
    fontSize: 13,
    color: "#888",
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  listenButton: {
    backgroundColor: "#6A5ACD", // Soft purple
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  readButton: {
    backgroundColor: "#4CAF50", // Green for reading
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  readNowButton: {
    backgroundColor: "#FFD700", // Gold for CTA
    borderRadius: 12,
    paddingVertical: 8,
    fontSize: 18,
  },
});

// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   Dimensions,
//   Animated,
// } from "react-native";
// import Carousel from "react-native-reanimated-carousel";
// import { Button } from "react-native-paper";

// const { width } = Dimensions.get("window");

// // ✅ Story Data
// const stories = [
//   {
//     id: "1",
//     title: "Cosmic Quest",
//     pages: 29,
//     genre: "✨ Space Adventure",
//     image: "https://picsum.photos/500",
//   },
//   {
//     id: "2",
//     title: "Jungle Adventure",
//     pages: 32,
//     genre: "🌳 Nature Exploration",
//     image: "https://picsum.photos/501",
//   },
//   {
//     id: "3",
//     title: "Dinosaur Age",
//     pages: 25,
//     genre: "🦖 Prehistoric Journey",
//     image: "https://picsum.photos/502",
//   },
//   {
//     id: "4",
//     title: "Ocean Secrets",
//     pages: 28,
//     genre: "🌊 Deep Sea Dive",
//     image: "https://picsum.photos/503",
//   },
// ];

// export default function FeaturedStoriesCarousel() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <View style={styles.carouselContainer}>
//       <Carousel
//         loop
//         width={width * 0.7} // Reduce width for 3D effect
//         height={250}
//         autoPlay
//         autoPlayInterval={3000}
//         data={stories}
//         scrollAnimationDuration={1000}
//         mode="horizontal-stack" // ✅ Enables stacking effect
//         modeConfig={{
//           snapDirection: "left",
//           stackInterval: 30, // ✅ Controls overlap distance
//         }}
//         renderItem={({ item, index }) => {
//           const isActive = index === activeIndex;

//           return (
//             <Animated.View
//               style={[
//                 styles.card,
//                 isActive && styles.activeCard,
//                 {
//                   transform: [{ scale: isActive ? 1.2 : 0.9 }], // ✅ Enlarges the active card
//                   opacity: isActive ? 1 : 0.8, // ✅ Slight fade on side cards
//                   zIndex: isActive ? 10 : 5, // ✅ Layering effect
//                 },
//               ]}
//             >
//               <Image source={{ uri: item.image }} style={styles.storyImage} />
//               <View style={styles.detailsContainer}>
//                 <Text style={styles.storyTitle}>{item.title}</Text>
//                 <Text style={styles.pageCount}>📖 {item.pages} Pages</Text>
//                 <Text style={styles.genre}>{item.genre}</Text>
//                 <View style={styles.buttonGroup}>
//                   <Button mode="contained" style={styles.listenButton}>
//                     🎵 Listen
//                   </Button>
//                   <Button mode="contained" style={styles.readButton}>
//                     📖 Read
//                   </Button>
//                 </View>
//               </View>
//             </Animated.View>
//           );
//         }}
//         onSnapToItem={(index) => setActiveIndex(index)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   carouselContainer: {
//     marginVertical: 20,
//     alignItems: "center",
//   },
//   card: {
//     backgroundColor: "#FFFBEB",
//     padding: 15,
//     borderRadius: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     elevation: 5,
//     borderWidth: 2,
//     borderColor: "#FFD700",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "90%",
//     position: "absolute", // ✅ Ensures overlap effect
//     marginHorizontal: -15, // ✅ Negative margin for overlapping
//   },
//   activeCard: {
//     transform: [{ scale: 1.2 }], // ✅ Enlarges the active card
//   },
//   storyImage: {
//     width: "100%",
//     height: 170,
//     borderRadius: 15,
//   },
//   detailsContainer: {
//     paddingTop: 12,
//     alignItems: "center",
//   },
//   storyTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   pageCount: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 4,
//   },
//   genre: {
//     fontSize: 13,
//     color: "#888",
//     marginBottom: 12,
//   },
//   buttonGroup: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   listenButton: {
//     backgroundColor: "#6A5ACD",
//     borderRadius: 10,
//     marginHorizontal: 5,
//     paddingHorizontal: 12,
//   },
//   readButton: {
//     backgroundColor: "#4CAF50",
//     borderRadius: 10,
//     marginHorizontal: 5,
//     paddingHorizontal: 12,
//   },
// });
