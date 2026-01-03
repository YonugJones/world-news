import { useMemo, useState } from 'react'
import { Header } from './components/Header/Header'
import { FiltersBar } from './components/FiltersBar/FiltersBar'
import { ArticleList } from './components/ArticleList/ArticleList'
import { LoadingState } from './components/states/LoadingState'
import { ErrorState } from './components/states/ErrorState'
import { EmptyState } from './components/states/EmptyState'
import type { Article, NewsCategory, NewsRegion } from './types/News'

export default function App() {
  // filter state
  const [category, setCategory] = useState<NewsCategory>('top')
  const [region, setRegion] = useState<NewsRegion>('world')
  const [search, setSearch] = useState('')

  // data state (placeholder for now)
  const [articles] = useState<Article[]>([])
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  /*
    simple derived state example for learning purposes:
    “Create a memoized boolean called hasResults that is true if there are any articles,
    and only recompute it when articles changes.”
  */
  const hasResults = useMemo(() => articles.length > 0, [articles])

  function retry() {
    // placeholder. will trigger refetch later
    console.log('retry')
  }

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
        {!loading && !error && !hasResults && <EmptyState />}
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
