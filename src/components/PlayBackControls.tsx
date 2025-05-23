import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { IconButton, Button, Text } from "react-native-paper";

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  style?: ViewStyle;
}

export default function PlaybackControls({
  isPlaying,
  onPlayPause,
  style,
}: PlaybackControlsProps) {
  return (
    <View style={[styles.container, style]}>
      <IconButton icon="skip-previous" size={30} iconColor="#FFF" />
      <Button mode="contained" style={styles.playButton} onPress={onPlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </Button>
      <IconButton icon="skip-next" size={30} iconColor="#FFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: "#3E92CC",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  playButton: {
    backgroundColor: "#FFD700",
    borderRadius: 15,
    paddingHorizontal: 20,
  },
});
