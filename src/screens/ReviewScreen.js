import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import FlashcardReview from '../components/FlashcardReview';
import { useCardStore } from '../state/cardStore';

export default function ReviewScreen() {
  const { currentCard, loading, fetchNextCard, rateCard } = useCardStore();

  useEffect(() => {
    fetchNextCard('sample-deck-id');
  }, []);

  const handleRate = async (rating) => {
    await rateCard(rating);
    Alert.alert('Rating', `You selected: ${rating}`);
    fetchNextCard('sample-deck-id');
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {!loading && currentCard && (
        <FlashcardReview
          question={currentCard.question}
          answer={currentCard.answer}
          onRate={handleRate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
});
