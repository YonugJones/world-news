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

import { useState } from 'react'
import type { Article } from '../../types/news'

type ArticleCardProps = {
  article: Article
  onOpen?: (article: Article) => void
}

export function ArticleCard({ article, onOpen }: ArticleCardProps) {
  const [imgError, setImgError] = useState(false)

  const showImage = Boolean(article.imageUrl) && !imgError

  return (
    <article className='border border-slate-300 rounded-md p-4 flex flex-col gap-3'>
      {showImage && (
        <div className='w-full overflow-hidden rounded-md border border-slate-200'>
          <img
            src={article.imageUrl}
            alt={article.title}
            loading='lazy'
            className='w-full aspect-video object-cover'
            onError={() => setImgError(true)}
          />
        </div>
      )}
      <h3 className='font-semibold text-slate-800'>
        <a
          href={article.url}
          target='_blank'
          rel='noreferrer'
          className='hover:underline'
        >
          {article.title}
        </a>
      </h3>

      {article.source && (
        <p className='text-sm text-slate-500'>Source: {article.source}</p>
      )}

      {article.publishedAt && (
        <p className='text-sm text-slate-500'>
          Published: {article.publishedAt}
        </p>
      )}

      {article.description && (
        <p className='text-sm text-slate-700'>{article.description}</p>
      )}

      {onOpen && (
        <button
          type='button'
          onClick={() => onOpen(article)}
          className='mt-auto self-start text-sm text-blue-600 hover:underline'
        >
          Open
        </button>
      )}
    </article>
  )
}
