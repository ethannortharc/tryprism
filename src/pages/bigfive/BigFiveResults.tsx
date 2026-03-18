/**
 * BigFiveResults — displays Big Five OCEAN personality results.
 *
 * Data loading priority:
 *   1. React Router navigation state
 *   2. localStorage key 'tryprism_bigfive_latest'
 *   3. First entry of localStorage key 'tryprism_bigfive_results'
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { exportBigFiveResultAsPdf } from '../../lib/pdf';
import { FACTOR_META, FACTOR_ORDER, FACET_META, FACET_ORDER } from '../../data/bigfive/facets';
import type { StoredBigFiveResult, BigFiveFactor } from '../../types/bigfive';
import FactorBar from '../../components/bigfive/FactorBar';
import FacetSection from '../../components/bigfive/FacetSection';
import type { FacetEntry } from '../../components/bigfive/FacetSection';
import HeaderControls from '../../components/HeaderControls';

// ---------------------------------------------------------------------------
// Factor key → i18n path fragment map
// ---------------------------------------------------------------------------

const FACTOR_I18N_KEY: Record<BigFiveFactor, string> = {
  O: 'openness',
  C: 'conscientiousness',
  E: 'extraversion',
  A: 'agreeableness',
  N: 'neuroticism',
};

// ---------------------------------------------------------------------------
// Storage fallback
// ---------------------------------------------------------------------------

function loadFromStorage(): StoredBigFiveResult | null {
  // Try direct latest key
  try {
    const raw = localStorage.getItem('tryprism_bigfive_latest');
    if (raw) {
      const parsed = JSON.parse(raw) as StoredBigFiveResult;
      if (parsed && parsed.factors) return parsed;
    }
  } catch {
    // ignore
  }

  // Try array of results
  try {
    const raw = localStorage.getItem('tryprism_bigfive_results');
    if (raw) {
      const arr = JSON.parse(raw) as StoredBigFiveResult[];
      if (Array.isArray(arr) && arr.length > 0 && arr[0].factors) {
        return arr[0];
      }
    }
  } catch {
    // ignore
  }

  return null;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function BigFiveResults() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const [result, setResult] = useState<StoredBigFiveResult | null>(null);

  useEffect(() => {
    const stateResult = location.state as StoredBigFiveResult | null;
    if (stateResult && stateResult.factors) {
      setResult(stateResult);
      return;
    }
    const stored = loadFromStorage();
    if (stored) {
      setResult(stored);
    }
  }, [location.state]);

  // ── No results state ──
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
        <HeaderControls />
        <p style={{ color: 'var(--text-secondary)' }}>
          {locale === 'zh' ? '未找到测评结果。' : 'No results found.'}
        </p>
        <button
          data-testid="bigfive-retake-button"
          onClick={() => navigate('/bigfive')}
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--bigfive-primary)',
            color: '#0a0a1e',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t('bigfive.results.retake')}
        </button>
      </main>
    );
  }

  const { factors, facets, mode } = result;
  const isFullMode = mode === 'full' && facets !== undefined;

  return (
    <main
      className="page-enter"
      data-pdf-content
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
      <HeaderControls />

      {/* ── Results Header ── */}
      <section
        data-testid="bigfive-results-header"
        style={{
          textAlign: 'center',
          padding: 'var(--space-8)',
          background: 'var(--bg-card)',
          border: '1px solid rgba(94, 170, 232, 0.4)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 0 40px rgba(94, 170, 232, 0.1)',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: 'var(--bigfive-primary)',
            marginBottom: 'var(--space-2)',
            letterSpacing: '-0.02em',
          }}
        >
          {t('bigfive.results.title')}
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {t('bigfive.results.subtitle')}
        </p>

        {/* Mode badge */}
        <span
          style={{
            display: 'inline-block',
            padding: 'var(--space-2) var(--space-4)',
            background: 'rgba(94, 170, 232, 0.12)',
            border: '1px solid rgba(94, 170, 232, 0.3)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--bigfive-primary)',
            letterSpacing: '0.04em',
          }}
        >
          {isFullMode ? t('bigfive.modes.full.badge') : t('bigfive.modes.quick.badge')}
          {' · '}
          {isFullMode ? t('bigfive.modes.full.questions') : t('bigfive.modes.quick.questions')}
        </span>
      </section>

      {/* ── Factor Scores ── */}
      <section
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
            marginBottom: 'var(--space-6)',
          }}
        >
          {t('bigfive.results.factors')}
        </h2>

        {FACTOR_ORDER.map((factorKey) => {
          const factorScore = factors[factorKey];
          if (!factorScore) return null;

          const meta = FACTOR_META[factorKey];
          const color = meta.color;
          const i18nKey = FACTOR_I18N_KEY[factorKey];
          const factorName = locale === 'zh' ? meta.name.zh : meta.name.en;
          const bandLabel = t(`bigfive.bands.${factorScore.band}`);
          const description = t(`bigfive.factors.${i18nKey}.${factorScore.band}`);
          const bandDescText = description;

          // Build facet entries if full mode
          let facetEntries: FacetEntry[] = [];
          if (isFullMode && facets) {
            const facetOrder = FACET_ORDER[factorKey];
            facetEntries = facetOrder
              .map((facetCode) => {
                const fs = facets[facetCode];
                if (!fs) return null;
                const fm = FACET_META[facetCode];
                return {
                  code: String(facetCode),
                  name: locale === 'zh' ? fm.name.zh : fm.name.en,
                  percentage: fs.percentage,
                  band: fs.band,
                  bandLabel: t(`bigfive.bands.${fs.band}`),
                } as FacetEntry;
              })
              .filter((e): e is FacetEntry => e !== null);
          }

          return (
            <div
              key={factorKey}
              style={{
                marginBottom: isFullMode ? 'var(--space-6)' : 'var(--space-5)',
                paddingBottom: isFullMode ? 'var(--space-6)' : 'var(--space-5)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <FactorBar
                name={factorName}
                percentage={factorScore.percentage}
                band={factorScore.band}
                bandLabel={bandLabel}
                color={color}
              />

              {/* Factor description */}
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  marginTop: 'var(--space-3)',
                  lineHeight: '1.65',
                }}
              >
                {bandDescText}
              </p>

              {/* Facet section (full mode only) */}
              {isFullMode && facetEntries.length > 0 && (
                <FacetSection
                  title={t('bigfive.results.facets')}
                  facets={facetEntries}
                  color={color}
                />
              )}
            </div>
          );
        })}
      </section>

      {/* ── Action Buttons ── */}
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
          data-testid="bigfive-retake-button"
          onClick={() => navigate('/bigfive')}
          style={{
            padding: 'var(--space-3) var(--space-8)',
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            fontSize: '1rem',
            border: '1px solid var(--border-default)',
            cursor: 'pointer',
          }}
        >
          {t('bigfive.results.retake')}
        </button>

        <button
          data-testid="pdf-export-button"
          onClick={() => {
            const mainEl = document.querySelector('[data-pdf-content]') as HTMLElement;
            exportBigFiveResultAsPdf(result, locale, mainEl);
          }}
          style={{
            padding: 'var(--space-3) var(--space-8)',
            background: 'var(--bigfive-primary)',
            color: '#0a0a1e',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t('bigfive.results.exportPdf')}
        </button>
      </section>
    </main>
  );
}
