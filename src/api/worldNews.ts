import type { Article } from '../types/news'
import type { ApiSearchNewsResponse, ApiNewsArticle } from './worldNewsTypes'
import { worldNewsClient, withApiKey } from './worldNewsClient'

function getHostname(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return undefined
  }
}

function mapApiArticleToUi(article: ApiNewsArticle): Article {
  return {
    id: String(article.id),
    title: article.title,
    description: article.summary ?? undefined,
    source: getHostname(article.url) ?? article.source_country ?? undefined,
    publishedAt: article.publish_date ?? undefined,
    url: article.url,
    imageUrl: article.image ?? undefined,
  }
}

// UI category -> API category string
export function toApiCategory(category: string): string | undefined {
  switch (category) {
    case 'business':
    case 'technology':
    case 'sports':
    case 'science':
    case 'health':
    case 'entertainment':
      return category
    case 'top':
    case 'world':
    default:
      return undefined
  }
}

// UI regions are broad; API wants a specific source_country (ISO 3166).
// Map to a representative country code.
export function toSourceCountry(region: string): string {
  switch (region) {
    case 'us':
      return 'use'
    case 'eu':
      return 'bg'
    case 'asia':
      return 'jp'
    case 'africa':
      return 'za'
    case 'americas':
      return 'us'
    case 'world':
    default:
      return 'use'
  }
}

type SearchNewsArgs = {
  search: string
  category: string
  region: string
  offset?: number
  number?: number
  signal?: AbortSignal
}

export async function searchNews({
  search,
  category,
  region,
  offset,
  number,
  signal,
}: SearchNewsArgs) {
  const apiCategory = toApiCategory(category)
  const sourceCountry = toSourceCountry(region)

  // API note: must set at least one filter such as text or language.  [oai_citation:2‡worldnewsapi.com](https://worldnewsapi.com/docs/search-news/)
  // Also, text typically expects >= 3 chars.

  const text = search.trim()
  const useText = text.length >= 3 ? text : undefined

  const params = withApiKey({
    language: 'en',
    'source-country': sourceCountry,
    categories: apiCategory,
    text: useText,
    offset,
    number,
    // sort newest first
    ...(useText ? { sort: 'publish-time', 'sort-direction': 'desc' } : {}),
  })

  const res = await worldNewsClient.get<ApiSearchNewsResponse>('/search-news', {
    params,
    signal,
  })

  return {
    offset: res.data.offset,
    number: res.data.number,
    available: res.data.available,
    articles: res.data.news.map(mapApiArticleToUi),
  }
}
