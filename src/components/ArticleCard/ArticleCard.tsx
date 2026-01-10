/*
	•	Pure presentational component
	•	Receives one article
	•	Displays:
    •	title
    •	source
    •	published date
    •	description
    •	image (if available)
No state. No side effects.
*/

import type { Article } from '../../types/news'

type ArticleCardProps = {
  article: Article
  onOpen?: (article: Article) => void
}

export function ArticleCard({ article, onOpen }: ArticleCardProps) {
  return (
    <article>
      <h3>
        <a href={article.url} target='_blank' rel='noreferrer'>
          {article.title}
        </a>
      </h3>

      {article.source ? <p>Source: {article.source}</p> : null}
      {article.publishedAt ? <p>Published: {article.publishedAt}</p> : null}
      {article.description ? <p>{article.description}</p> : null}

      {onOpen ? (
        <button type='button' onClick={() => onOpen(article)}>
          Open
        </button>
      ) : null}
    </article>
  )
}
