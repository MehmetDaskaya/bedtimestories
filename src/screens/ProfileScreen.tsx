import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { List, Divider, Button, Avatar } from "react-native-paper";
import AppHeader from "../components/AppHeader";

export default function ProfileScreen() {
  const [username, setUsername] = useState("Mehmet Daşkaya");
  const [characterCreated, setCharacterCreated] = useState(true);

  return (
    <View style={styles.container}>
      {/* Scrollable Content Including App Header */}
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeader title="Profile" />

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Avatar.Image
            size={80}
            source={require("../../assets/avatar.webp")}
            style={styles.avatar}
          />
          <Text style={styles.username}>{username}</Text>
          <Button mode="outlined" style={styles.editProfileButton}>
            Edit Profile
          </Button>
        </View>

        <Divider style={styles.divider} />

        {/* Character Creation Section */}
        <List.Section style={styles.section}>
          <List.Subheader>Character</List.Subheader>
          {characterCreated ? (
            <>
              <List.Item
                title="Customize Character"
                left={() => <List.Icon icon="brush" />}
              />
              <List.Item
                title="Change Outfit"
                left={() => <List.Icon icon="tshirt-crew" />}
              />
            </>
          ) : (
            <Button mode="contained" style={styles.createButton}>
              Create Your Character
            </Button>
          )}
        </List.Section>

        <Divider style={styles.divider} />

        {/* Read Stories History */}
        <List.Section style={styles.section}>
          <List.Subheader>Read Stories</List.Subheader>
          <List.Item
            title="Luna’s Lost Shapes"
            description="Completed"
            left={() => <List.Icon icon="book" />}
          />
          <List.Item
            title="Jungle Adventure"
            description="In Progress"
            left={() => <List.Icon icon="book-open" />}
          />
          <List.Item
            title="Space Explorers"
            description="Not Started"
            left={() => <List.Icon icon="book-outline" />}
          />
        </List.Section>

        <Divider style={styles.divider} />

        {/* Favorite Stories */}
        <List.Section style={styles.section}>
          <List.Subheader>Favorite Stories</List.Subheader>
          <List.Item
            title="Mystical Moonlight"
            left={() => <List.Icon icon="heart" />}
          />
          <List.Item
            title="The Enchanted Forest"
            left={() => <List.Icon icon="heart-outline" />}
          />
        </List.Section>

        <Divider style={styles.divider} />

        {/* Progress Tracking */}
        <List.Section style={styles.section}>
          <List.Subheader>Progress</List.Subheader>
          <List.Item
            title="Total Stories Read: 5"
            left={() => <List.Icon icon="check-circle-outline" />}
          />
          <List.Item
            title="Total Hours Listened: 12h 30m"
            left={() => <List.Icon icon="clock-outline" />}
          />
        </List.Section>

        <Divider style={styles.divider} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 10,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  editProfileButton: {
    marginTop: 5,
  },
  section: {
    marginHorizontal: 20, // Ensures good spacing
  },
  divider: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  createButton: {
    marginHorizontal: 20,
    backgroundColor: "#4CAF50",
  },
});
