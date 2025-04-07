import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Anki AI</Text>
      <Text style={styles.subtitle}>
        Your next-generation flashcard app powered by AI.
      </Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Auth')}
      />
      <Button
        title="Import Deck"
        onPress={() => navigation.navigate('DeckEditor')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
});
