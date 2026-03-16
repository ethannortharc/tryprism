/**
 * ArrowsDiagram — Shows growth (integration) and stress (disintegration) directions
 * for a given primary Enneagram type.
 */

import { GROWTH_ARROWS, STRESS_ARROWS } from '../lib/scoring';
import { useI18n } from '../contexts/I18nContext';

interface ArrowsDiagramProps {
  primaryType: number;
}

export default function ArrowsDiagram({ primaryType }: ArrowsDiagramProps) {
  const { t } = useI18n();
  const growthTarget = GROWTH_ARROWS[primaryType];
  const stressTarget = STRESS_ARROWS[primaryType];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-4)',
      }}
    >
      {/* Growth arrow */}
      <div
        data-testid="growth-arrow"
        className="growth-arrow"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)',
          textAlign: 'center',
        }}
        aria-label={`growth direction from type ${primaryType} to type ${growthTarget}`}
      >
        <div
          style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {t('results.growth')}
        </div>
        <div
          style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'var(--type-9)',
            letterSpacing: '-0.01em',
          }}
        >
          {primaryType} → {growthTarget}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
          integration
        </div>
      </div>

      {/* Stress arrow */}
      <div
        data-testid="stress-arrow"
        className="stress-arrow"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)',
          textAlign: 'center',
        }}
        aria-label={`stress direction from type ${primaryType} to type ${stressTarget}`}
      >
        <div
          style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {t('results.stress')}
        </div>
        <div
          style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'var(--type-1)',
            letterSpacing: '-0.01em',
          }}
        >
          {primaryType} → {stressTarget}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
          disintegration
        </div>
      </div>
    </div>
  );
}
