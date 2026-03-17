/**
 * PreferenceStrengthBars — 4 horizontal bars showing dichotomy preference percentages.
 *
 * Each bar has two colored fills (from each side), a center 50% marker,
 * pole labels + percentages, and a strength label below.
 */

import { useI18n } from '../../contexts/I18nContext';
import type { DichotomyPreference, MbtiDichotomy, MbtiPole } from '../../types/mbti';

// Pole color map to CSS custom properties
const POLE_COLORS: Record<MbtiPole, string> = {
  E: 'var(--pole-e)',
  I: 'var(--pole-i)',
  S: 'var(--pole-s)',
  N: 'var(--pole-n)',
  T: 'var(--pole-t)',
  F: 'var(--pole-f)',
  J: 'var(--pole-j)',
  P: 'var(--pole-p)',
};

// Dichotomy order for stable rendering
const DICHOTOMY_ORDER: MbtiDichotomy[] = ['EI', 'SN', 'TF', 'JP'];

interface PreferenceStrengthBarsProps {
  preferences: DichotomyPreference[];
}

export default function PreferenceStrengthBars({ preferences }: PreferenceStrengthBarsProps) {
  const { t } = useI18n();

  // Re-order preferences to match canonical dichotomy order
  const ordered = DICHOTOMY_ORDER.map(
    (d) => preferences.find((p) => p.dichotomy === d),
  ).filter(Boolean) as DichotomyPreference[];

  return (
    <div
      data-testid="preference-bars"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        width: '100%',
      }}
    >
      {ordered.map((pref) => {
        const { dichotomy, poleA, poleB, percentA, percentB, strength } = pref;
        const poleALabel = t(`mbti.dichotomies.${dichotomy}.${poleA}`);
        const poleBLabel = t(`mbti.dichotomies.${dichotomy}.${poleB}`);
        const strengthLabel = t(`mbti.results.${strength}`);
        const colorA = POLE_COLORS[poleA];
        const colorB = POLE_COLORS[poleB];
        const pctA = Math.round(percentA);
        const pctB = Math.round(percentB);

        return (
          <div
            key={dichotomy}
            className="dichotomy-bar preference-bar-row"
            data-testid={`dichotomy-${dichotomy}`}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
          >
            {/* Pole labels + percentages */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: colorA,
                }}
              >
                {poleA} — {poleALabel}
                <span style={{ marginLeft: 'var(--space-2)', opacity: 0.9 }}>
                  {pctA}%
                </span>
              </span>
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: colorB,
                  textAlign: 'right',
                }}
              >
                <span style={{ marginRight: 'var(--space-2)', opacity: 0.9 }}>
                  {pctB}%
                </span>
                {poleBLabel} — {poleB}
              </span>
            </div>

            {/* Bar track */}
            <div
              style={{
                position: 'relative',
                height: '10px',
                borderRadius: '5px',
                background: 'var(--bg-elevated)',
                overflow: 'hidden',
              }}
            >
              {/* Pole A fill (left side) */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${pctA}%`,
                  background: colorA,
                  borderRadius: '5px 0 0 5px',
                  transition: 'width 0.6s ease',
                }}
              />
              {/* Pole B fill (right side) */}
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: `${pctB}%`,
                  background: colorB,
                  borderRadius: '0 5px 5px 0',
                  transition: 'width 0.6s ease',
                }}
              />
              {/* Center 50% marker */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  transform: 'translateX(-50%)',
                  width: '2px',
                  height: '100%',
                  background: 'var(--bg-card)',
                  opacity: 0.7,
                  zIndex: 1,
                }}
              />
            </div>

            {/* Strength label */}
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
              }}
            >
              {strengthLabel}
            </div>
          </div>
        );
      })}
    </div>
  );
}
