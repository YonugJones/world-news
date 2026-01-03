/*
	•	Receives articles: Article[]
	•	Maps → ArticleCard
	•	Layout only (list or grid)
*/

import type { Article } from '../../types/News'
import { ArticleCard } from '../ArticleCard/ArticleCard'

type ArticleListProps = {
  articles: Article[]
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <section aria-label='Articles'>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  )
}
