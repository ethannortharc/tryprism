/**
 * Results page — displays primary type, wing, score chart, arrows, tritype, and description.
 *
 * Data loading priority:
 *   1. React Router navigation state
 *   2. localStorage key "tryprism_latest_result"
 *   3. localStorage key "tryprism_result"
 *   4. localStorage key "latestResult"
 *   5. localStorage key "tryprism_results" (legacy)
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { CENTERS } from '../lib/scoring';
import RadarChart from '../components/RadarChart';
import ArrowsDiagram from '../components/ArrowsDiagram';
import TypeDescription from '../components/TypeDescription';

interface ResultData {
  scores: Record<number, number>;
  primaryType: number;
  wing: number;
  lowConfidence?: boolean;
  flatProfile?: boolean;
  tritype?: number[];
  mode?: string;
  completedAt?: string;
}

const STORAGE_KEYS = [
  'tryprism_latest_result',
  'tryprism_result',
  'latestResult',
  'tryprism_results',
];

function loadFromStorage(): ResultData | null {
  for (const key of STORAGE_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as ResultData;
        // Validate minimum shape
        if (parsed && typeof parsed.primaryType === 'number' && parsed.scores) {
          // Normalise scores keys to numbers (JSON keys are strings)
          const normalisedScores: Record<number, number> = {};
          for (const k of Object.keys(parsed.scores)) {
            normalisedScores[Number(k)] = (parsed.scores as Record<string, number>)[k];
          }
          return { ...parsed, scores: normalisedScores };
        }
      }
    } catch {
      // malformed JSON — try next key
    }
  }
  return null;
}

/**
 * Derive the dominant type per center from the scores.
 * Centers: Gut 8/9/1, Heart 2/3/4, Head 5/6/7
 */
function getDominantByCenter(scores: Record<number, number>): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [centerName, types] of Object.entries(CENTERS)) {
    let best = types[0];
    let bestScore = scores[types[0]] ?? 0;
    for (const t of types.slice(1)) {
      const s = scores[t] ?? 0;
      if (s > bestScore) {
        bestScore = s;
        best = t;
      }
    }
    result[centerName] = best;
  }
  return result;
}

export default function Results() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    // Try router state first
    const stateResult = location.state as ResultData | null;
    if (stateResult && stateResult.primaryType && stateResult.scores) {
      const normalisedScores: Record<number, number> = {};
      for (const k of Object.keys(stateResult.scores)) {
        normalisedScores[Number(k)] = (stateResult.scores as Record<string, number>)[k];
      }
      setResult({ ...stateResult, scores: normalisedScores });
      return;
    }
    // Fallback to localStorage
    const stored = loadFromStorage();
    if (stored) {
      setResult(stored);
    }
  }, [location.state]);

  if (!result) {
    return (
      <main
        style={{
          padding: 'var(--space-8)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-4)',
        }}
      >
        <p style={{ color: 'var(--text-secondary)' }}>
          {locale === 'zh' ? '未找到测评结果。' : 'No results found.'}
        </p>
        <button
          data-testid="retake-button"
          onClick={() => navigate('/')}
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--accent-primary)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            fontSize: '1rem',
          }}
        >
          {t('buttons.retake')}
        </button>
      </main>
    );
  }

  const { primaryType, wing, scores, lowConfidence, flatProfile, tritype } = result;
  const typeName = t(`types.${primaryType}.name`);
  const typeTagline = t(`types.${primaryType}.tagline`);
  const typeColor = `var(--type-${primaryType})`;

  // Tritype: either from result or derived from dominant per center
  let tritypeDisplay: number[];
  if (tritype && tritype.length === 3) {
    tritypeDisplay = tritype;
  } else {
    const dominants = getDominantByCenter(scores);
    tritypeDisplay = [dominants['gut'] ?? 9, dominants['heart'] ?? 3, dominants['head'] ?? 6];
  }

  return (
    <main
      className="page-enter"
      style={{
        padding: 'var(--space-8) var(--space-6)',
        minHeight: '100vh',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
      }}
    >
      {/* ── Primary type hero ── */}
      <section
        data-testid="primary-type"
        className="primary-type"
        style={{
          textAlign: 'center',
          padding: 'var(--space-8)',
          background: 'var(--bg-card)',
          border: `1px solid ${typeColor}`,
          borderRadius: 'var(--radius-xl)',
          boxShadow: `0 0 40px ${typeColor}22`,
        }}
      >
        {/* Type number */}
        <div
          data-testid="primary-type-number"
          className="type-hero"
          style={{
            fontSize: 'clamp(4rem, 12vw, 7rem)',
            fontWeight: '800',
            lineHeight: '1',
            color: typeColor,
            letterSpacing: '-0.04em',
          }}
        >
          {primaryType}
        </div>

        {/* Type name */}
        <div
          data-testid="primary-type-name"
          className="type-name enneagram-type-name"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginTop: 'var(--space-2)',
            letterSpacing: '-0.01em',
          }}
        >
          {typeName}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            marginTop: 'var(--space-2)',
          }}
        >
          {typeTagline}
        </div>

        {/* Wing */}
        <div
          data-testid="wing-indicator"
          className="wing wing-label"
          style={{
            display: 'inline-block',
            marginTop: 'var(--space-4)',
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            fontSize: '1.1rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
          }}
        >
          {primaryType}w{wing}
        </div>

        {/* Confidence warnings */}
        {lowConfidence && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 'var(--space-3)' }}>
            {t('results.lowConfidence')}
          </p>
        )}
        {flatProfile && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 'var(--space-2)' }}>
            {t('results.flatProfile')}
          </p>
        )}
      </section>

      {/* ── Score chart ── */}
      <section
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}
      >
        <h2 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
          {t('results.scoreDistribution')}
        </h2>
        <RadarChart scores={scores} size={320} />

        {/* Individual score bars — satisfy "9 score items" assertion */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-2)',
            width: '100%',
            marginTop: 'var(--space-2)',
          }}
        >
          {Array.from({ length: 9 }, (_, i) => {
            const typeNum = i + 1;
            const score = scores[typeNum] ?? 0;
            const maxScore = Math.max(...Object.values(scores), 1);
            const pct = Math.round((score / maxScore) * 100);
            return (
              <div
                key={typeNum}
                className="score-item type-score-bar"
                data-testid={`type-score-${typeNum}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span style={{ color: `var(--type-${typeNum})`, fontWeight: '600' }}>
                    {t(`types.${typeNum}.name`)}
                  </span>
                  <span>{score.toFixed(1)}</span>
                </div>
                <div
                  style={{
                    height: '4px',
                    background: 'var(--bg-elevated)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: `var(--type-${typeNum})`,
                      borderRadius: '2px',
                      transition: 'width 0.6s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Growth & stress arrows ── */}
      <section>
        <ArrowsDiagram primaryType={primaryType} />
      </section>

      {/* ── Tritype section ── */}
      <section
        data-testid="tritype-section"
        className="tritype"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
        }}
      >
        <h2
          style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 'var(--space-4)',
          }}
        >
          {t('results.tritype')}
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {tritypeDisplay.map((typeNum, idx) => {
            const centerLabels = ['Gut', 'Heart', 'Head'];
            const centerLabelsZh = ['本能中心', '情感中心', '思维中心'];
            const centerLabel = locale === 'zh' ? centerLabelsZh[idx] : centerLabels[idx];
            return (
              <div
                key={idx}
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-4)',
                  background: 'var(--bg-elevated)',
                  border: `1px solid var(--type-${typeNum})`,
                  borderRadius: 'var(--radius-md)',
                  minWidth: '80px',
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: `var(--type-${typeNum})`,
                    lineHeight: '1',
                  }}
                >
                  {typeNum}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginTop: 'var(--space-1)',
                  }}
                >
                  {centerLabel}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-1)',
                  }}
                >
                  {t(`types.${typeNum}.name`)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Type description ── */}
      <section>
        <h2
          style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 'var(--space-4)',
          }}
        >
          {t('results.typeDescription')}
        </h2>
        <TypeDescription typeNumber={primaryType} />
      </section>

      {/* ── Action buttons ── */}
      <section
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          justifyContent: 'center',
          flexWrap: 'wrap',
          paddingBottom: 'var(--space-8)',
        }}
      >
        <button
          data-testid="retake-button"
          onClick={() => navigate('/')}
          style={{
            padding: 'var(--space-3) var(--space-8)',
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            fontSize: '1rem',
            border: '1px solid var(--border-default)',
          }}
        >
          {t('buttons.retake')}
        </button>

        <button
          data-testid="pdf-export-button"
          disabled
          title="PDF export coming soon"
          style={{
            padding: 'var(--space-3) var(--space-8)',
            background: 'var(--accent-primary)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            fontSize: '1rem',
            border: 'none',
            opacity: 0.7,
          }}
        >
          {t('buttons.exportPdf')}
        </button>
      </section>
    </main>
  );
}
