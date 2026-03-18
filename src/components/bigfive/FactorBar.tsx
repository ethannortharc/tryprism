/**
 * FactorBar — horizontal score bar for a single Big Five factor.
 *
 * Props:
 *   name       — display name for the factor
 *   percentage — 0-100 score
 *   band       — 'low' | 'average' | 'high'
 *   bandLabel  — translated band label string
 *   color      — CSS color string for the bar
 */

interface FactorBarProps {
  name: string;
  percentage: number;
  band: 'low' | 'average' | 'high';
  bandLabel: string;
  color: string;
}

export default function FactorBar({ name, percentage, band: _band, bandLabel, color }: FactorBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(percentage)));

  return (
    <div data-testid="factor-section" style={{ marginBottom: 'var(--space-4)' }}>
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-2)',
        }}
      >
        <h3
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: color,
            margin: 0,
          }}
        >
          {name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span
            data-testid="band-label"
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: color,
              padding: '2px 8px',
              borderRadius: '12px',
              background: `color-mix(in srgb, ${color} 15%, transparent)`,
              border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {bandLabel}
          </span>
          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              fontWeight: 500,
              minWidth: '36px',
              textAlign: 'right',
            }}
          >
            {pct}%
          </span>
        </div>
      </div>

      {/* Score bar track */}
      <div
        style={{
          width: '100%',
          height: '8px',
          background: 'var(--bg-elevated)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          data-testid="factor-bar"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name}: ${pct}%`}
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color,
            borderRadius: '4px',
            transition: 'width 0.7s ease',
          }}
        />
      </div>
    </div>
  );
}
