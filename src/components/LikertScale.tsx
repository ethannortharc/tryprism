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
        const color = OPTION_COLORS[index];

        return (
          <div
            key={optionValue}
            role="radio"
            aria-checked={isSelected}
            aria-label={label}
            tabIndex={isSelected ? 0 : -1}
            data-testid={`likert-${optionValue}`}
            data-value={optionValue}
            data-selected={isSelected ? 'true' : 'false'}
            className={isSelected ? 'likert-option selected' : 'likert-option'}
            onClick={() => onChange(optionValue)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onChange(optionValue);
              }
              if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                onChange(Math.min(optionValue + 1, labels.length));
              }
              if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                onChange(Math.max(optionValue - 1, 1));
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              padding: 'var(--space-4) var(--space-6)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${isSelected ? color : 'var(--border-default)'}`,
              background: isSelected
                ? `color-mix(in srgb, ${color} 12%, var(--bg-card))`
                : 'var(--bg-card)',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition:
                'border-color var(--transition-base), background var(--transition-base), transform var(--transition-fast)',
              transform: isSelected ? 'scale(1.01)' : 'scale(1)',
              minHeight: '44px',
              boxSizing: 'border-box',
              userSelect: 'none',
            }}
          >
            {/* Visual circle indicator */}
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: `2px solid ${isSelected ? color : 'var(--border-strong)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: isSelected ? color : 'var(--text-muted)',
                background: isSelected
                  ? `color-mix(in srgb, ${color} 15%, transparent)`
                  : 'transparent',
                transition: 'all var(--transition-base)',
              }}
            >
              {optionValue}
            </span>

            {/* Label text */}
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
          </div>
        );
      })}
    </div>
  );
}
