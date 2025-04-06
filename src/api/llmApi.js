import { useApiKeyStore } from '../state/apiKeyStore';

// Placeholder function to call OpenRouter LLM API
export async function generateQA(concept, provider = 'openai', model = 'gpt-3.5-turbo') {
  const apiKey = useApiKeyStore.getState().getApiKey(provider);
  if (!apiKey) {
    throw new Error(`No API key set for provider: ${provider}`);
  }

  // TODO: Replace with real OpenRouter API call
  console.log(`Calling ${provider} (${model}) via OpenRouter with key: ${apiKey}`);
  console.log(`Concept: ${concept}`);

  // Simulate API response
  return {
    question: `Sample question for "${concept}"`,
    answer: `Sample answer for "${concept}"`,
  };
}
