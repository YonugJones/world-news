/*
	•	Receives articles: Article[]
	•	Maps → ArticleCard
	•	Layout only (list or grid)
*/

import type { Article } from '../../types/news'
import { ArticleCard } from '../ArticleCard/ArticleCard'

type ArticleListProps = {
  articles: Article[]
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <section
      aria-label='Articles'
      className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
    >
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  )
}
