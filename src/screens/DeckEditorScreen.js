import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDeckStore } from '../state/deckStore';

export default function DeckEditorScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const createDeck = useDeckStore((state) => state.createDeck);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Deck name is required');
      return;
    }
    await createDeck({ name, description });
    Alert.alert('Success', 'Deck saved');
    setName('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Deck Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Save Deck" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
});
