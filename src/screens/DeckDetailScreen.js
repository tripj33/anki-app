import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { supabase } from '../api/supabase';

export default function DeckDetailScreen() {
  const route = useRoute();
  const { deckId } = route.params;
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newConcept, setNewConcept] = useState('');

  const fetchConcepts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('deck_id', deckId);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setConcepts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConcepts();
  }, []);

  const addConcept = async () => {
    if (!newConcept.trim()) return;
    const { error } = await supabase
      .from('cards')
      .insert([{ deck_id: deckId, concept: newConcept.trim() }]);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setNewConcept('');
      fetchConcepts();
    }
  };

  const deleteConcept = async (id) => {
    const { error } = await supabase.from('cards').delete().eq('id', id);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      fetchConcepts();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="New Concept"
        value={newConcept}
        onChangeText={setNewConcept}
        style={styles.input}
      />
      <Button title="Add Concept" onPress={addConcept} />
      {loading && <Text>Loading concepts...</Text>}
      <FlatList
        data={concepts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.conceptItem}>
            <Text style={styles.conceptText}>{item.concept}</Text>
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteConcept(item.id)}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  conceptItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  conceptText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
