import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, useTheme } from "react-native-paper";
import StoryCarousel from "../components/StoryCarousel";
import FeaturedStories from "../components/FeaturedStories";
import Categories from "../components/Categories";
import PlaybackControls from "../components/PlayBackControls";
import AppHeader from "../components/AppHeader";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function LibraryScreen(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/bg_storybook.webp")}
          style={styles.background}
          resizeMode="cover"
        >
          {/* Gradient overlay for better readability */}
          <LinearGradient
            colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
            style={styles.overlay}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* App Header */}
              <AppHeader title="My Library" />

              {/* Welcome Message */}
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>
                  Welcome back, little reader! 📚
                </Text>
                <Text style={styles.subtitleText}>
                  What story shall we read today?
                </Text>
              </View>

              {/* Search Bar */}
              <Searchbar
                placeholder="Find a magical story..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
                iconColor={theme.colors.primary}
                placeholderTextColor={theme.colors.primary}
              />

              {/* Featured Stories Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Featured Adventures</Text>
                <FeaturedStories />
              </View>

              {/* Continue Reading Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Continue Reading</Text>
                <StoryCarousel />
              </View>

              {/* Categories Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Explore by Category</Text>
                <Categories />
              </View>

              {/* Playback Controls */}
              {isPlaying && (
                <PlaybackControls
                  isPlaying={isPlaying}
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                  style={styles.playbackControls}
                />
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A4A4A",
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: "#666666",
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A4A4A",
    marginBottom: 10,
    marginLeft: 5,
  },
  searchBar: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 25,
    elevation: 2,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  playbackControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
});
