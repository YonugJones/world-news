import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useDebounce } from './hooks/useDebouce'
import { searchNews } from './api/worldNews'
import type { Article, NewsCategory, NewsRegion } from './types/news'

import { Header } from './components/Header/Header'
import { FiltersBar } from './components/FiltersBar/FiltersBar'
import { ArticleList } from './components/ArticleList/ArticleList'
import { LoadingState } from './components/states/LoadingState'
import { ErrorState } from './components/states/ErrorState'
import { EmptyState } from './components/states/EmptyState'

export default function App() {
  const [category, setCategory] = useState<NewsCategory>('top')
  const [region, setRegion] = useState<NewsRegion>('world')
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search)

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasResults = useMemo(() => articles.length > 0, [articles])

  const [retryTick, setRetryTick] = useState(0)
  function retry() {
    setRetryTick((t) => t + 1)
  }

  useEffect(() => {
    const controller = new AbortController()

    async function run() {
      setLoading(true)
      setError(null)

      try {
        const result = await searchNews({
          search: debouncedSearch, // ✅ use debounced value
          category,
          region,
          offset: 0,
          number: 20,
          signal: controller.signal,
        })

        setArticles(result.articles)
      } catch (err) {
        if (controller.signal.aborted) return

        if (axios.isAxiosError(err)) {
          const status = err.response?.status
          if (status === 401 || status === 403) {
            setError('Auth error: check your API key in .env.local')
          } else if (status === 429) {
            setError('Rate limited: too many requests. Try again in a bit.')
          } else {
            setError(err.response?.data?.message ?? err.message)
          }
        } else if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Something went wrong.')
        }

        setArticles([])
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    run()

    return () => controller.abort()
  }, [category, region, debouncedSearch, retryTick])

  return (
    <>
      <Header />

      <FiltersBar
        category={category}
        region={region}
        search={search}
        onCategoryChange={setCategory}
        onRegionChange={setRegion}
        onSearchChange={setSearch}
      />

      <main>
        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} onRetry={retry} />}

        {!loading && !error && !hasResults && (
          <EmptyState description='Try another category/region, or type a search (3+ characters).' />
        )}

        {!loading && !error && hasResults && (
          <ArticleList articles={articles} />
        )}
      </main>

      <footer>
        <button type='button' disabled>
          Load More (coming soon)
        </button>
      </footer>
    </>
  )
}
