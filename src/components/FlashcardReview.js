import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Animated, Easing } from 'react-native';

export default function FlashcardReview({ question, answer, onRate, loading, error }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const flipAnim = useState(new Animated.Value(0))[0];

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: showAnswer ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setShowAnswer(!showAnswer);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flipCard}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ rotateY: frontInterpolate }],
              backfaceVisibility: 'hidden',
              position: 'absolute',
            },
          ]}
        >
          <Text style={styles.text}>{question}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ rotateY: backInterpolate }],
              backfaceVisibility: 'hidden',
            },
          ]}
        >
          <Text style={styles.text}>{answer}</Text>
        </Animated.View>
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
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
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
