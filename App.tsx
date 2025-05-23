import React, { createElement, useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { Provider as PaperProvider } from "react-native-paper";
import { useAuth, AuthProvider } from "./src/context/AuthContext";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import LibraryScreen from "./src/screens/LibraryScreen";
import CreateStoryScreen from "./src/screens/CreateStoryScreen";
import StoryPageScreen from "./src/screens/StoryPageScreen";
import SignInScreen from "./src/screens/Authentication/SignInScreen";
import SignUpScreen from "./src/screens/Authentication/SignUpScreen";
import ForgotPasswordScreen from "./src/screens/Authentication/ForgotPasswordScreen";
import CustomDrawer from "./src/navigation/CustomDrawer";
import { AuthStackParamList, MainStackParamList } from "./src/navigation/types";

const Drawer = createDrawerNavigator<MainStackParamList>();
const Stack = createNativeStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#FFF8E1",
          width: 300,
        },
        drawerActiveTintColor: "#D2691E",
        drawerInactiveTintColor: "#555",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Library" component={LibraryScreen} />
      <Drawer.Screen name="Create" component={CreateStoryScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen
        name="StoryPage"
        component={StoryPageScreen}
        initialParams={{ bookId: "", mode: "read" }} // Provide default params to avoid TypeScript errors
      />
    </Drawer.Navigator>
  );
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>(); // ✅ Add type

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
}

function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

const App = () => (
  <PaperProvider>
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  </PaperProvider>
);

export default gestureHandlerRootHOC(App);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
  },
});
