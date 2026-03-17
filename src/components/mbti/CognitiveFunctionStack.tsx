/**
 * CognitiveFunctionStack — 4 function cards in a vertical stack.
 *
 * Each card shows: function abbreviation, role label, full function name,
 * and brief description. Color-coded by type group. Inferior function dimmed.
 */

import type { CognitiveFunction } from '../../types/mbti';

const TYPE_GROUP_COLORS: Record<string, string> = {
  analyst: 'var(--mbti-analyst)',
  diplomat: 'var(--mbti-diplomat)',
  sentinel: 'var(--mbti-sentinel)',
  explorer: 'var(--mbti-explorer)',
};

const ROLE_LABELS: Record<string, { en: string; zh: string }> = {
  dominant:  { en: 'Dominant',  zh: '主导' },
  auxiliary: { en: 'Auxiliary', zh: '辅助' },
  tertiary:  { en: 'Tertiary',  zh: '第三' },
  inferior:  { en: 'Inferior',  zh: '劣势' },
};

interface CognitiveFunctionStackProps {
  cognitiveStack: CognitiveFunction[];
  locale: string;
  typeGroup?: string;
}

export default function CognitiveFunctionStack({
  cognitiveStack,
  locale,
  typeGroup = 'analyst',
}: CognitiveFunctionStackProps) {
  const groupColor = TYPE_GROUP_COLORS[typeGroup] ?? 'var(--accent-primary)';

  return (
    <div
      data-testid="cognitive-functions"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        width: '100%',
      }}
    >
      {cognitiveStack.map((fn, idx) => {
        const isInferior = fn.role === 'inferior';
        const roleLabel =
          ROLE_LABELS[fn.role]?.[locale as 'en' | 'zh'] ??
          ROLE_LABELS[fn.role]?.en ??
          fn.role;
        const fnLabel =
          locale === 'zh' ? fn.label.zh : fn.label.en;
        const fnDesc =
          locale === 'zh' ? fn.description.zh : fn.description.en;

        return (
          <div
            key={idx}
            data-testid={`cognitive-fn-${idx}`}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-4)',
              padding: 'var(--space-4)',
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              borderLeft: `4px solid ${isInferior ? 'var(--border-default)' : groupColor}`,
              opacity: isInferior ? 0.65 : 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            {/* Function abbreviation */}
            <div
              style={{
                minWidth: '40px',
                fontSize: '1.25rem',
                fontWeight: '700',
                color: isInferior ? 'var(--text-muted)' : groupColor,
                letterSpacing: '-0.01em',
                lineHeight: '1.2',
                paddingTop: '2px',
              }}
            >
              {fn.name}
            </div>

            {/* Role + name + description */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                {/* Role badge */}
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: isInferior ? 'var(--text-muted)' : groupColor,
                    background: isInferior
                      ? 'var(--bg-card)'
                      : `${groupColor}22`,
                    padding: '1px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {roleLabel}
                </span>
                {/* Full function name */}
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                  }}
                >
                  {fnLabel}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.825rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.55',
                  margin: 0,
                }}
              >
                {fnDesc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
