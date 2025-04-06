import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import FlashcardReview from '../components/FlashcardReview';

export default function ReviewScreen() {
  const sampleQuestion = 'What is the capital of France?';
  const sampleAnswer = 'Paris';

  const handleRate = (rating) => {
    console.log('User rated:', rating);
    Alert.alert('Rating', `You selected: ${rating}`);
    // TODO: Update spaced repetition algorithm, fetch next card
  };

  return (
    <View style={styles.container}>
      <FlashcardReview
        question={sampleQuestion}
        answer={sampleAnswer}
        onRate={handleRate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
