type LoadingStateProps = {
  message?: string
}

export function LoadingState({
  message = 'Loading news...',
}: LoadingStateProps) {
  return (
    <section aria-label='Loading'>
      <p>{message}</p>
    </section>
  )
}
