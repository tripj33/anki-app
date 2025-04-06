import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '../state/authStore';
import { useApiKeyStore } from '../state/apiKeyStore';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');

  const { signIn, signUp, loading, error } = useAuthStore();
  const setApiKeyStore = useApiKeyStore((state) => state.setApiKey);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Email and password are required');
      return;
    }
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
    if (apiKey) {
      setApiKeyStore('openai', apiKey);
    }
    if (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="OpenAI API Key (optional)"
        value={apiKey}
        onChangeText={setApiKey}
        style={styles.input}
      />
      <Button
        title={isLogin ? 'Login' : 'Sign Up'}
        onPress={handleSubmit}
        disabled={loading}
      />
      <Button
        title={isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        onPress={() => setIsLogin(!isLogin)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
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
