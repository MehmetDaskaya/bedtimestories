import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Switch,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomDrawer(props: any) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Background with a playful theme */}
      <ImageBackground
        source={require("../../assets/bg_storybook.webp")}
        style={styles.background}
      >
        {/* Drawer Header (Profile Info) */}
        <View style={styles.header}>
          <Avatar.Image
            size={70}
            source={require("../../assets/avatar.webp")}
          />
          <Text style={styles.username}>Mehmet Daşkaya</Text>
          <Text style={styles.email}>mehmettaskaya16@gmail.com</Text>
        </View>
      </ImageBackground>

      {/* Drawer Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <View>
          <DrawerItemList {...props} />
        </View>

        {/* Preferences Section */}
        <View style={styles.preferencesContainer}>
          <TouchableOpacity
            style={styles.preferenceHeader}
            onPress={() => setPreferencesOpen(!preferencesOpen)}
          >
            <Text style={styles.preferenceText}>Preferences</Text>
            <MaterialIcons
              name={preferencesOpen ? "expand-less" : "expand-more"}
              size={24}
              color="black"
            />
          </TouchableOpacity>

          {preferencesOpen && (
            <View style={styles.preferencesContent}>
              {/* Language Selection */}
              <View style={styles.languageContainer}>
                <TouchableOpacity onPress={() => setLanguage("Turkish")}>
                  <Text
                    style={[
                      styles.flag,
                      language === "Turkish" && styles.selectedFlag,
                    ]}
                  >
                    🇹🇷
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLanguage("English")}>
                  <Text
                    style={[
                      styles.flag,
                      language === "English" && styles.selectedFlag,
                    ]}
                  >
                    🇬🇧
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLanguage("German")}>
                  <Text
                    style={[
                      styles.flag,
                      language === "German" && styles.selectedFlag,
                    ]}
                  >
                    🇩🇪
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Dark Mode Toggle */}
              <View style={styles.settingItem}>
                <Text style={styles.toggleIcon}>🌞</Text>
                <Switch
                  value={darkMode}
                  onValueChange={() => setDarkMode(!darkMode)}
                />
                <Text style={styles.toggleIcon}>🌙</Text>
              </View>
            </View>
          )}
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 0.8, // 80% of screen height
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
    marginTop: height * 0.05,
    marginBottom: height * 0.01,
  },
  background: {
    width: "100%",
    height: height * 0.25,
    resizeMode: "cover",
  },
  header: {
    alignItems: "center",
    paddingTop: height * 0.07,
    paddingBottom: height * 0.05,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  username: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: height * 0.01,
  },
  email: {
    fontSize: width * 0.035,
    color: "#ddd",
  },
  drawerContent: {
    flexGrow: 1,
    backgroundColor: "#FFF8E1",
    justifyContent: "space-between",
  },
  preferencesContainer: {
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.02,
  },
  preferenceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  preferenceText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  preferencesContent: {
    paddingTop: height * 0.01,
  },
  languageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: height * 0.015,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.015,
  },
  flag: {
    fontSize: width * 0.08,
    padding: width * 0.02,
  },
  selectedFlag: {
    backgroundColor: "#FFD700",
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.025,
  },
  toggleIcon: {
    fontSize: width * 0.06,
    marginHorizontal: width * 0.03,
  },
});
