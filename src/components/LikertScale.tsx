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
    <fieldset
      style={{
        border: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
      }}
    >
      <legend className="visually-hidden">Select your answer</legend>
      <div
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
          const inputId = `likert-option-${optionValue}`;

          return (
            <label
              key={optionValue}
              htmlFor={inputId}
              data-value={optionValue}
              data-selected={isSelected ? 'true' : 'false'}
              className={isSelected ? 'selected' : ''}
              style={{
                position: 'relative',
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
                minHeight: '44px',
                boxSizing: 'border-box',
              }}
            >
              {/* Real radio input — covers entire label area, transparent overlay for a11y */}
              <input
                type="radio"
                id={inputId}
                name="likert-answer"
                value={optionValue}
                checked={isSelected}
                onChange={() => onChange(optionValue)}
                aria-label={label}
                data-testid="likert-option"
                data-value={optionValue}
                data-selected={isSelected ? 'true' : 'false'}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  margin: 0,
                  zIndex: 1,
                }}
              />

              {/* Visual circle indicator */}
              <span
                aria-hidden="true"
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
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
