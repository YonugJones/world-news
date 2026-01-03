export type NewsCategory =
  | 'top'
  | 'world'
  | 'business'
  | 'technology'
  | 'sports'
  | 'science'
  | 'health'
  | 'entertainment'

export type NewsRegion = 'world' | 'us' | 'eu' | 'asia' | 'africa' | 'americas'

export interface Article {
  id: string
  title: string
  description?: string
  source?: string
  publishedAt?: string
  url: string
  imageUrl?: string
}
