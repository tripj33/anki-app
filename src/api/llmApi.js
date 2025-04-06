import { useApiKeyStore } from '../state/apiKeyStore';

// Placeholder for real OpenRouter LLM API call
export async function generateQA(concept, provider = 'openai', model = 'gpt-3.5-turbo') {
  const apiKey = useApiKeyStore.getState().getApiKey(provider);
  if (!apiKey) {
    throw new Error(`No API key set for provider: ${provider}`);
  }

  try {
    const response = await fetch('https://openrouter.ai/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        provider,
        model,
        prompt: concept,
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.statusText}`);
    }

    const data = await response.json();

    // TODO: Adjust based on real API response structure
    return {
      question: data.question || `Sample question for "${concept}"`,
      answer: data.answer || `Sample answer for "${concept}"`,
    };
  } catch (error) {
    console.error('LLM API call failed:', error);
    // Fallback to sample
    return {
      question: `Sample question for "${concept}"`,
      answer: `Sample answer for "${concept}"`,
    };
  }
}
