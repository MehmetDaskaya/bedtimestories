import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { List, Divider, Button } from "react-native-paper";
import AppHeader from "../components/AppHeader";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  return (
    <View style={styles.container}>
      {/* Scrollable Content Including App Header */}
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeader title="Settings" />

        {/* Account Settings */}
        <List.Section style={styles.section}>
          <List.Subheader style={styles.subheader}>Account</List.Subheader>
          <List.Item
            title="Profile Information"
            left={() => <List.Icon icon="account" />}
          />
          <List.Item
            title="Change Password"
            left={() => <List.Icon icon="lock" />}
          />
        </List.Section>

        <Divider style={styles.divider} />

        {/* Preferences */}
        <List.Section style={styles.section}>
          <List.Subheader style={styles.subheader}>Preferences</List.Subheader>

          {/* Dark Mode Toggle */}
          <View style={styles.settingItem}>
            <List.Item
              title="Dark Mode"
              left={() => <List.Icon icon="theme-light-dark" />}
            />
            <Switch
              value={darkMode}
              onValueChange={() => setDarkMode(!darkMode)}
            />
          </View>

          {/* Notifications Toggle */}
          <View style={styles.settingItem}>
            <List.Item
              title="Enable Notifications"
              left={() => <List.Icon icon="bell" />}
            />
            <Switch
              value={notifications}
              onValueChange={() => setNotifications(!notifications)}
            />
          </View>

          {/* Language Selection */}
          <List.Accordion
            title={`Language: ${language}`}
            left={() => <List.Icon icon="translate" />}
          >
            <List.Item title="English" onPress={() => setLanguage("English")} />
            <List.Item title="Spanish" onPress={() => setLanguage("Spanish")} />
            <List.Item title="French" onPress={() => setLanguage("French")} />
          </List.Accordion>
        </List.Section>

        <Divider style={styles.divider} />

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <Button
            mode="contained"
            onPress={() => console.log("Logging out...")}
            style={styles.logoutButton}
          >
            Logout
          </Button>
        </View>
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
  section: {
    marginHorizontal: 20, // Add more spacing to sections
  },
  subheader: {
    marginLeft: 10, // More spacing for section titles
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20, // More spacing for toggles
    paddingVertical: 8,
  },
  divider: {
    marginHorizontal: 20, // Add more spacing around dividers
    marginVertical: 10,
  },
  logoutContainer: {
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20, // More spacing for the logout button
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
    width: "100%",
  },
});
