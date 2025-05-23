import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

interface Story {
  id: string;
  title: string;
  category: string;
  cover: string;
}

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: story.cover }} style={styles.image} />
      <Card.Content>
        <Title>{story.title}</Title>
        <Paragraph>{story.category}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default StoryCard;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 4,
  },
  image: {
    height: 150,
  },
});
