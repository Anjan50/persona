import { CLAUDE_API_URL, CLAUDE_API_VERSION, CLAUDE_MODEL, API_KEY_STORAGE_KEY } from './constants.js';

export const getStoredApiKey = () => {
  try {
    return window.localStorage.getItem(API_KEY_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const callClaude = async ({ system, messages, maxTokens }) => {
  const key = getStoredApiKey();
  if (!key) {
    throw new Error('No API key available');
  }

  const res = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': CLAUDE_API_VERSION,
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });

  if (!res.ok) {
    let errorMessage = `API error: ${res.status}`;
    try {
      const errorData = await res.json();
      if (errorData?.error?.message) {
        errorMessage = errorData.error.message;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return res.json();
};

