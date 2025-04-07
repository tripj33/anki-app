import { useApiKeyStore } from '../state/apiKeyStore';

// Real OpenRouter LLM API call
export async function generateQA(concept, provider = 'openai', model = 'gpt-3.5-turbo') {
  const apiKey = useApiKeyStore.getState().getApiKey(provider);
  if (!apiKey) {
    throw new Error(`No API key set for provider: ${provider}`);
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful flashcard generator. Given a concept, generate a question and answer pair to test understanding of that concept.',
          },
          {
            role: 'user',
            content: `Concept: ${concept}`,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.statusText}`);
    }

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content || '';
    const [question, answer] = text.split('Answer:').map(s => s.trim());

    return {
      question: question.replace(/^Question:/i, '').trim() || `Sample question for "${concept}"`,
      answer: answer || `Sample answer for "${concept}"`,
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
