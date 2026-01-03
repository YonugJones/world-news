type ErrorStaeProps = {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStaeProps) {
  return (
    <section aria-label='Error'>
      <p role='alert'>{message}</p>
      {onRetry ? (
        <button type='button' onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </section>
  )
}
