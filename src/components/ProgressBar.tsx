interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div
      style={{
        width: '100%',
        marginBottom: 'var(--space-6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-2)',
        }}
      >
        <span
          data-testid="question-number"
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {current} / {total}
        </span>
        <span
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          {Math.round(percentage)}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Question ${current} of ${total}`}
        data-testid="progress-bar"
        style={{
          width: '100%',
          height: '4px',
          background: 'var(--border-default)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, var(--accent-primary), #c87ee8)',
            borderRadius: '2px',
            transition: 'width var(--transition-slow)',
          }}
        />
      </div>
    </div>
  );
}
