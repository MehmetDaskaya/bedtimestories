import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppHeaderProps {
  title: string;
  onBookmarkPress?: () => void;
}

export default function AppHeader({ title, onBookmarkPress }: AppHeaderProps) {
  const navigation = useNavigation<DrawerNavigationProp<{}>>(); // ✅ Fix openDrawer issue
  const insets = useSafeAreaInsets();
  return (
    <Appbar.Header style={[styles.appbar, { top: insets.top }]}>
      {/* Wrap Avatar.Image in TouchableOpacity */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Avatar.Image
          size={40}
          source={require("../../assets/avatar.webp")}
          style={styles.clickableAvatar}
        />
      </TouchableOpacity>

      <Appbar.Content title={title} titleStyle={styles.headerTitle} />
      <Appbar.Action
        icon="bookmark"
        style={styles.notificationIcon}
        onPress={onBookmarkPress}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  appbar: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "white",
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  clickableAvatar: {
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF4785",
  },
  notificationIcon: {
    backgroundColor: "white",
  },
});
