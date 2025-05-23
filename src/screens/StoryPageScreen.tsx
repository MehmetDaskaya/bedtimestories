import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  ImageBackground,
  PanResponder,
} from "react-native";
//import { Audio } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  IconButton,
  Button,
  ProgressBar,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/types";
import storyDataJson from "../data/data.json";

type StoryPageScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "StoryPage"
>;

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF4785",
    accent: "#5252FF",
    background: "#FFFFFF",
    text: "#333333",
  },
};

export default function StoryPageScreen({
  route,
  navigation,
}: StoryPageScreenProps): React.ReactElement {
  const { bookId } = route.params;
  const [mode, setMode] = useState<"read" | "listen" | null>(null);

  useEffect(() => {
    setMode(null); // Reset mode on screen open
  }, [bookId]);

  const insets = useSafeAreaInsets();

  // Get story data
  const storyData = storyDataJson.stories.find((story) => story.id === bookId);

  if (!storyData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Story not found.</Text>
      </View>
    );
  }

  // State variables
  //const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(mode === "listen");
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [navbarOpacity, setNavbarOpacity] = useState(0.9);
  const [navArrowsOpacity, setNavArrowsOpacity] = useState(0.9);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const navbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentPageIndexRef = useRef(currentPageIndex);
  useEffect(() => {
    currentPageIndexRef.current = currentPageIndex;
  }, [currentPageIndex]);

  useEffect(() => {
    setCurrentPageIndex(0); // Reset to first page when mode or story changes
  }, [bookId, mode]);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const navbarAnimOpacity = useRef(new Animated.Value(0.9)).current;
  const arrowsAnimOpacity = useRef(new Animated.Value(0.9)).current;

  // Set initial navbar to auto-hide after component mounts
  useEffect(() => {
    // Start with fully visible navbar
    navbarAnimOpacity.setValue(0.9);

    // Then fade out
    const timeout = setTimeout(() => {
      Animated.timing(navbarAnimOpacity, {
        toValue: 0.2,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 2000);

    return () => {
      if (timeout) clearTimeout(timeout);
      if (navbarTimeoutRef.current) clearTimeout(navbarTimeoutRef.current);
    };
  }, []);

  // Current page data
  const currentPage = storyData.pages[currentPageIndex];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === storyData.pages.length - 1;

  // Load audio when in listen mode
  //useEffect(() => {
  // if (mode === "listen") {
  //  loadAudio();
  //}

  //return () => {
  // Clean up audio when component unmounts
  //if (sound) {
  //sound.unloadAsync();
  //}
  //};
  //}, [mode]);

  // Update page based on audio timestamp when in listen mode
  useEffect(() => {
    if (mode === "listen" && isPlaying) {
      const interval = setInterval(() => {
        // Find which page corresponds to current playback position
        const nextPageIndex = storyData.pages.findIndex((page, index) => {
          const thisPageTime = page.audioTimestamp;
          const nextPageTime =
            index < storyData.pages.length - 1
              ? storyData.pages[index + 1].audioTimestamp
              : Infinity;

          return (
            playbackPosition >= thisPageTime && playbackPosition < nextPageTime
          );
        });

        if (nextPageIndex !== -1 && nextPageIndex !== currentPageIndex) {
          animatePageTransition(nextPageIndex);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [playbackPosition, isPlaying, currentPageIndex, mode]);

  // Load audio file
  const loadAudio = async () => {
    try {
      // In a real app, you would load the actual audio file:
      // const { sound: newSound } = await Audio.Sound.createAsync(
      //   { uri: storyData.audioUrl },
      //   { shouldPlay: true },
      //   onPlaybackStatusUpdate
      // );

      // For this example, we'll simulate audio loading:
      console.log(`Loading audio for: ${storyData.title}`);
      setIsPlaying(true);

      // Simulate audio duration (in seconds) for this example
      setPlaybackDuration(90);

      // Start a timer to simulate playback position updates
      const interval = setInterval(() => {
        setPlaybackPosition((prev) => {
          const newPosition = prev + 1;
          if (newPosition >= playbackDuration) {
            clearInterval(interval);
            setIsPlaying(false);
            return playbackDuration;
          }
          return newPosition;
        });
      }, 1000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  // Handle audio playback status updates
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis / 1000);
      setPlaybackDuration(status.durationMillis / 1000);
      setIsPlaying(status.isPlaying);

      // If audio finished playing
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  // Toggle play/pause
  //const togglePlayPause = async () => {
  //if (sound) {
  //if (isPlaying) {
  // await sound.pauseAsync();
  //setIsPlaying(false);
  //} else {
  // await sound.playAsync();
  //setIsPlaying(true);
  //}
  //} else if (mode === "listen") {
  //loadAudio();
  //}
  //};

  // Animate page transition
  const animatePageTransition = (nextPageIndex: number) => {
    // Cross-fade animation for smoother transitions
    // First reduce the opacity without scaling to avoid jarring effect
    Animated.timing(fadeAnim, {
      toValue: 0.3,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      // Change page
      setCurrentPageIndex(nextPageIndex);

      // Then smoothly fade back in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => {
        if (
          gestureState.dx < -50 &&
          currentPageIndexRef.current < storyData.pages.length - 1
        ) {
          // Swipe left -> Next Page
          animatePageTransition(currentPageIndexRef.current + 1);
        } else if (gestureState.dx > 50 && currentPageIndexRef.current > 0) {
          // Swipe right -> Previous Page
          animatePageTransition(currentPageIndexRef.current - 1);
        }
      },
    })
  ).current;

  // For dragging text
  const textPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const textPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: textPosition.x, dy: textPosition.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(textPosition, {
          toValue: { x: 0, y: 0 }, // Reset to original position
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // Handle navbar interaction
  const handleNavbarInteraction = () => {
    // Cancel any existing timeout
    if (navbarTimeoutRef.current) {
      clearTimeout(navbarTimeoutRef.current);
    }

    // Show navbar
    Animated.timing(navbarAnimOpacity, {
      toValue: 0.9,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animate navbar opacity
    Animated.timing(navbarAnimOpacity, {
      toValue: 0.9,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Set timeout to hide navbar again
    navbarTimeoutRef.current = setTimeout(() => {
      Animated.timing(navbarAnimOpacity, {
        toValue: 0.2,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 2000);
  };

  // Format time for audio progress
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!mode) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: storyData.coverImage }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.modeSelectionContainer}>
            <Button
              mode="contained"
              onPress={() => setMode("read")}
              style={styles.selectButton}
              labelStyle={{ fontSize: 18 }}
            >
              📖 Read
            </Button>
            <Button
              mode="outlined"
              onPress={() => setMode("listen")}
              style={styles.selectButton}
              labelStyle={{ fontSize: 18 }}
            >
              🎧 Listen
            </Button>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />

        <Animated.View
          style={[
            styles.fullScreenContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <ImageBackground
            {...panResponder.panHandlers}
            source={{ uri: currentPage.imageUrl }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            {/* Header inside the image - with auto-hide */}
            <Animated.View
              style={[
                styles.header,
                {
                  paddingTop: insets.top > 0 ? insets.top : 10,
                  opacity: navbarAnimOpacity,
                },
              ]}
              onTouchStart={handleNavbarInteraction}
            >
              <IconButton
                icon="arrow-left"
                size={24}
                iconColor="#FFF"
                onPress={() => {
                  handleNavbarInteraction();
                  navigation.goBack();
                }}
                style={styles.iconButton}
              />
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle} numberOfLines={1}>
                  {storyData.title}
                </Text>
                <Text style={styles.headerSubtitle}>By {storyData.author}</Text>
              </View>
              <View style={styles.pageIndicator}>
                <Text style={styles.pageNumber}>
                  {currentPageIndex + 1}/{storyData.pages.length}
                </Text>
              </View>
            </Animated.View>

            {/* Text overlay at the bottom */}
            <Animated.View
              {...textPanResponder.panHandlers}
              style={[
                styles.textOverlayContainer,
                {
                  transform: [
                    { translateX: textPosition.x },
                    { translateY: textPosition.y },
                  ],
                },
              ]}
            >
              <View style={styles.textContainer}>
                <Text style={styles.pageText}>{currentPage.text}</Text>
              </View>
            </Animated.View>
          </ImageBackground>
        </Animated.View>

        {/* Audio controls (only in listen mode) */}
        {mode === "listen" && (
          <View style={styles.audioControls}>
            <View style={styles.progressContainer}>
              <Text style={styles.timeText}>
                {formatTime(playbackPosition)}
              </Text>
              <ProgressBar
                progress={
                  playbackDuration > 0 ? playbackPosition / playbackDuration : 0
                }
                color={theme.colors.primary}
                style={styles.progressBar}
              />
              <Text style={styles.timeText}>
                {formatTime(playbackDuration)}
              </Text>
            </View>

            <View style={styles.audioButtons}>
              <IconButton
                icon="rewind-10"
                size={32}
                onPress={() => {
                  const newPosition = Math.max(0, playbackPosition - 10);
                  // In a real app: await sound.setPositionAsync(newPosition * 1000);
                  setPlaybackPosition(newPosition);
                }}
              />

              <IconButton
                icon={isPlaying ? "pause-circle" : "play-circle"}
                size={48}
                iconColor={theme.colors.primary}
                //onPress={togglePlayPause}
              />

              <IconButton
                icon="fast-forward-10"
                size={32}
                onPress={() => {
                  const newPosition = Math.min(
                    playbackDuration,
                    playbackPosition + 10
                  );
                  // In a real app: await sound.setPositionAsync(newPosition * 1000);
                  setPlaybackPosition(newPosition);
                }}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Dark background for full-screen effect
  },
  fullScreenContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "space-between", // Space elements between top and bottom
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8, // Reduced height
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent dark background
  },
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  headerTitleContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  headerTitle: {
    fontSize: 16, // Reduced font size
    fontWeight: "bold",
    color: "#FFF", // White text for better contrast on image
  },
  headerSubtitle: {
    fontSize: 12, // Reduced font size
    color: "#EEE", // Light gray for subtitle
  },
  pageIndicator: {
    paddingHorizontal: 8, // Reduced padding
    paddingVertical: 3, // Reduced padding
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
  },
  pageNumber: {
    fontSize: 12, // Reduced font size
    fontWeight: "bold",
    color: "#FFF",
  },
  textOverlayContainer: {
    width: "100%",
    marginTop: "auto", // Push to bottom
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  textContainer: {
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.5)", // Semi-transparent white
    borderRadius: 16,
  },
  pageText: {
    fontSize: 18,
    lineHeight: 26,
    color: "#000", // Black text for contrast on white background
    fontWeight: "500", // Slightly bolder for better readability
  },
  navigationButtonsOverlay: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    top: "50%",
    paddingHorizontal: 10,
    zIndex: 10,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonDisabled: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  audioControls: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    width: 40,
  },
  audioButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#FF0000",
  },

  modeSelectionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  selectButton: {
    marginVertical: 10,
    width: "70%",
    borderRadius: 20,
  },
});
