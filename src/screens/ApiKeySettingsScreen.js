import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useApiKeyStore } from '../state/apiKeyStore';

export default function ApiKeySettingsScreen() {
  const apiKeys = useApiKeyStore((state) => state.keys);
  const setApiKey = useApiKeyStore((state) => state.setApiKey);

  const [openaiKey, setOpenaiKey] = useState(apiKeys.openai);
  const [claudeKey, setClaudeKey] = useState(apiKeys.claude);
  const [geminiKey, setGeminiKey] = useState(apiKeys.gemini);
  const [deepseekKey, setDeepseekKey] = useState(apiKeys.deepseek);

  const saveKeys = () => {
    setApiKey('openai', openaiKey);
    setApiKey('claude', claudeKey);
    setApiKey('gemini', geminiKey);
    setApiKey('deepseek', deepseekKey);
    Alert.alert('Saved', 'API keys updated');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Keys</Text>
      <TextInput
        placeholder="OpenAI API Key"
        value={openaiKey}
        onChangeText={setOpenaiKey}
        style={styles.input}
      />
      <TextInput
        placeholder="Claude API Key"
        value={claudeKey}
        onChangeText={setClaudeKey}
        style={styles.input}
      />
      <TextInput
        placeholder="Gemini API Key"
        value={geminiKey}
        onChangeText={setGeminiKey}
        style={styles.input}
      />
      <TextInput
        placeholder="DeepSeek API Key"
        value={deepseekKey}
        onChangeText={setDeepseekKey}
        style={styles.input}
      />
      <Button title="Save API Keys" onPress={saveKeys} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
});
