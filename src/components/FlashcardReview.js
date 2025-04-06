import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FlashcardReview({ question, answer, onRate }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowAnswer(!showAnswer)} style={styles.card}>
        <Text style={styles.text}>
          {showAnswer ? answer : question}
        </Text>
      </TouchableOpacity>

      {showAnswer && (
        <View style={styles.buttons}>
          {['Again', 'Hard', 'Good', 'Easy'].map((label) => (
            <TouchableOpacity key={label} style={styles.button} onPress={() => onRate(label)}>
              <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
