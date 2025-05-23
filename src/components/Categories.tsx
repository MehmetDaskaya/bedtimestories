import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const categories = ["Fantasy", "Animals", "Science", "Adventure"];

export default function Categories() {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <Button key={index} mode="contained" style={styles.categoryButton}>
          {category}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  categoryButton: {
    backgroundColor: "#FF69B4",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
});
