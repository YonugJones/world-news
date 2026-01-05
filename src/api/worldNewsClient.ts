import axios from 'axios'

const apiKey = import.meta.env.VITE_WORLD_NEWS_API_KEY

if (!apiKey) {
  // Fail fast in dev so there's no ambiguity to cause of error
  console.warn('Missing VITE_WORLD_NEWS_API_KEY')
}

export const worldNewsClient = axios.create({
  baseURL: 'https://api.worldnewsapi.com',
  timeout: 15_000,
})

// Helper to attach api-key param on every request
export function withApiKey(params: Record<string, unknown> = {}) {
  return {
    ...params,
    'api-key': apiKey,
  }
}
