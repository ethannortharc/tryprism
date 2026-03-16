import { useSearchParams } from 'react-router-dom';

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') ?? 'quick';

  return (
    <main style={{ padding: 'var(--space-8)', minHeight: '100vh' }}>
      <h1>Quiz — {mode} mode</h1>
      <p data-testid="question-text">Loading questions...</p>
    </main>
  );
}
