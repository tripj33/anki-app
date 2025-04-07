import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDeckStore } from '../state/deckStore';

export default function DeckScreen() {
  const navigation = useNavigation();
  const { decks, fetchDecks, deleteDeck, loading } = useDeckStore();

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleDelete = (deckId) => {
    Alert.alert('Delete Deck', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteDeck(deckId),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Create New Deck"
        onPress={() => navigation.navigate('DeckEditor')}
      />
      {loading && <Text>Loading decks...</Text>}
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deckItem}>
            <TouchableOpacity>
              <Text style={styles.deckName}>{item.name}</Text>
              <Text style={styles.deckDescription}>{item.description}</Text>
            </TouchableOpacity>
            <Button
              title="Delete"
              color="red"
              onPress={() => handleDelete(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  deckItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  deckName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deckDescription: {
    fontSize: 14,
    color: '#666',
  },
});
