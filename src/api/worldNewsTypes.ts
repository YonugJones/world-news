export interface ApiSearchNewsResponse {
  offset: number
  number: number
  available: number
  news: ApiNewsArticle[]
}

export interface ApiNewsArticle {
  id: number
  title: string
  text?: string
  summary?: string
  url: string
  image?: string
  video?: string | null
  publish_date?: string
  authors?: string[]
  category?: string
  language?: string
  source_country?: string
  sentiment?: number
}
