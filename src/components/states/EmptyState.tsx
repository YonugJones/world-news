type EmptyStateProps = {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No results',
  description = 'Try changing filters or searching for something else',
}: EmptyStateProps) {
  return (
    <section aria-label='Empty'>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  )
}
