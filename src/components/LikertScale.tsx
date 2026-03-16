interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
  labels: string[];
}

const OPTION_COLORS = [
  'var(--type-1)',
  'var(--type-3)',
  'var(--type-9)',
  'var(--type-5)',
  'var(--type-6)',
];

export default function LikertScale({ value, onChange, labels }: LikertScaleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Select your answer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        width: '100%',
      }}
    >
      {labels.map((label, index) => {
        const optionValue = index + 1;
        const isSelected = value === optionValue;

        return (
          <button
            key={optionValue}
            role="radio"
            aria-checked={isSelected}
            data-testid="likert-option"
            data-value={optionValue}
            data-selected={isSelected ? 'true' : 'false'}
            className={isSelected ? 'selected' : ''}
            onClick={() => onChange(optionValue)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              padding: 'var(--space-4) var(--space-6)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${isSelected ? OPTION_COLORS[index] : 'var(--border-default)'}`,
              background: isSelected
                ? `color-mix(in srgb, ${OPTION_COLORS[index]} 12%, var(--bg-card))`
                : 'var(--bg-card)',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition:
                'border-color var(--transition-base), background var(--transition-base), transform var(--transition-fast)',
              transform: isSelected ? 'scale(1.01)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'var(--border-strong)';
                (e.currentTarget as HTMLButtonElement).style.background =
                  'var(--bg-elevated)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'var(--border-default)';
                (e.currentTarget as HTMLButtonElement).style.background =
                  'var(--bg-card)';
              }
            }}
          >
            {/* Number indicator */}
            <span
              style={{
                flexShrink: 0,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: `2px solid ${isSelected ? OPTION_COLORS[index] : 'var(--border-strong)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: isSelected ? OPTION_COLORS[index] : 'var(--text-muted)',
                background: isSelected
                  ? `color-mix(in srgb, ${OPTION_COLORS[index]} 15%, transparent)`
                  : 'transparent',
                transition: 'all var(--transition-base)',
              }}
            >
              {optionValue}
            </span>

            {/* Label */}
            <span
              style={{
                fontSize: '0.9rem',
                color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isSelected ? 500 : 400,
                transition: 'color var(--transition-base)',
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
