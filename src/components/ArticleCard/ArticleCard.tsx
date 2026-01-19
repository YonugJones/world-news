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

import { useMemo, useState } from 'react'
import type { Article } from '../../types/news'

type ArticleCardProps = {
  article: Article
  onOpen?: (article: Article) => void
}

function formatPublishedAt(value: string): string {
  // Handles ISO strings and YYYY-MM-DD formats
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(d)
}

export function ArticleCard({ article, onOpen }: ArticleCardProps) {
  const [imgError, setImgError] = useState(false)

  const showImage = Boolean(article.imageUrl) && !imgError

  const publishedLabel = useMemo(() => {
    return article.publishedAt ? formatPublishedAt(article.publishedAt) : null
  }, [article.publishedAt])

  return (
    <article className='border border-slate-300 rounded-md overflow-hidden bg-white transition hover:shadow-sm hover:border-slate-400 focus-within:shadow-sm focus-within:border-slate-300 flex flex-col gap-3'>
      {/* Image or Placeholder */}
      <div className='aspect-video w-full bg-slate-100'>
        {showImage ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            loading='lazy'
            className='h-full w-full object-cover'
            onError={() => setImgError(true)}
          />
        ) : (
          <div className='h-full w-full flex items-center justify-center text-slate-400 text-sm'>
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-4 flex flex-col gap-2'>
        <h3 className='font-semibold text-slate-800 leading-snug line-clamp-2'>
          <a
            href={article.url}
            target='_blank'
            rel='noreferrer'
            className='hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded '
          >
            {article.title}
          </a>
        </h3>

        <div className='flex flex-col gap-1'>
          {article.source && (
            <p className='text-sm text-slate-500'>Source: {article.source}</p>
          )}

          {publishedLabel && (
            <p className='text-sm text-slate-500'>
              Published: {publishedLabel}
            </p>
          )}
        </div>

        {article.description && (
          <p className='text-sm text-slate-700 line-clamp-3'>
            {article.description}
          </p>
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
      </div>
    </article>
  )
}
