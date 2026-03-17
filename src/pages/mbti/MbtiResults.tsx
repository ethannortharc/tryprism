/**
 * MbtiResults — full MBTI results page.
 *
 * Data loading priority:
 *   1. React Router navigation state
 *   2. localStorage key 'tryprism_mbti_latest'
 *   3. localStorage key 'mbti_latest_result'
 *   4. localStorage key 'tryprism_mbti_latest_result'
 *   5. First entry of localStorage key 'tryprism_mbti_results'
 *
 * If no data found, shows "No results found" with link back to /mbti.
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { exportMbtiResultAsPdf } from '../../lib/pdf';
import { mbtiTypeDescriptions } from '../../data/mbti/typeDescriptions';
import HeaderControls from '../../components/HeaderControls';
import PreferenceStrengthBars from '../../components/mbti/PreferenceStrengthBars';
import CognitiveFunctionStack from '../../components/mbti/CognitiveFunctionStack';
import type { DichotomyPreference, CognitiveFunction, MbtiType, MbtiTypeGroup } from '../../types/mbti';

// ---------------------------------------------------------------------------
// Type group colors
// ---------------------------------------------------------------------------

const TYPE_GROUP_COLORS: Record<string, string> = {
  analyst:  'var(--mbti-analyst)',
  diplomat: 'var(--mbti-diplomat)',
  sentinel: 'var(--mbti-sentinel)',
  explorer: 'var(--mbti-explorer)',
};

// ---------------------------------------------------------------------------
// Stored result shape (as saved by quiz completion)
// ---------------------------------------------------------------------------

interface StoredMbtiResult {
  type: MbtiType;
  typeGroup?: MbtiTypeGroup;
  preferences?: DichotomyPreference[];
  cognitiveStack?: CognitiveFunction[];
  dichotomies?: Record<string, {
    firstPole: string;
    secondPole: string;
    firstPct: number;
    secondPct: number;
    dominant: string;
    percentA?: number;
    percentB?: number;
    poleA?: string;
    poleB?: string;
    strength?: string;
  }>;
  mode?: string;
  completedAt?: string;
  takenAt?: string;
  testType?: string;
  id?: string;
}

// ---------------------------------------------------------------------------
// Storage key resolution
// ---------------------------------------------------------------------------

const MBTI_STORAGE_KEYS = [
  'tryprism_mbti_latest',
  'mbti_latest_result',
  'tryprism_mbti_latest_result',
];

function loadFromStorage(): StoredMbtiResult | null {
  // Try direct keys first
  for (const key of MBTI_STORAGE_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredMbtiResult;
        if (parsed && parsed.type && parsed.type.length === 4) {
          return parsed;
        }
      }
    } catch {
      // malformed — try next
    }
  }
  // Try array of results
  try {
    const raw = localStorage.getItem('tryprism_mbti_results');
    if (raw) {
      const arr = JSON.parse(raw) as StoredMbtiResult[];
      if (Array.isArray(arr) && arr.length > 0 && arr[0].type) {
        return arr[0];
      }
    }
  } catch {
    // ignore
  }
  return null;
}

// ---------------------------------------------------------------------------
// Derive DichotomyPreference[] from dichotomies record if needed
// ---------------------------------------------------------------------------

const DICHOTOMY_ORDER: Array<'EI' | 'SN' | 'TF' | 'JP'> = ['EI', 'SN', 'TF', 'JP'];

function preferencesFromDichotomies(
  dichotomies: StoredMbtiResult['dichotomies'],
): DichotomyPreference[] {
  if (!dichotomies) return [];
  return DICHOTOMY_ORDER.map((d) => {
    const entry = dichotomies[d];
    if (!entry) {
      return {
        dichotomy: d,
        poleA: d[0] as 'E' | 'S' | 'T' | 'J',
        poleB: d[1] as 'I' | 'N' | 'F' | 'P',
        percentA: 50,
        percentB: 50,
        preference: d[0] as 'E' | 'S' | 'T' | 'J',
        strength: 'slight' as const,
      };
    }
    const poleA = (entry.poleA ?? entry.firstPole ?? d[0]) as DichotomyPreference['poleA'];
    const poleB = (entry.poleB ?? entry.secondPole ?? d[1]) as DichotomyPreference['poleB'];
    const percentA = entry.percentA ?? entry.firstPct ?? 50;
    const percentB = entry.percentB ?? entry.secondPct ?? (100 - percentA);
    const preference = entry.dominant as DichotomyPreference['preference'];
    const strength = (entry.strength ?? 'slight') as DichotomyPreference['strength'];
    return { dichotomy: d, poleA, poleB, percentA, percentB, preference, strength };
  });
}

// ---------------------------------------------------------------------------
// Section component helper
// ---------------------------------------------------------------------------

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      data-testid={id}
      className={id}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
      }}
    >
      <h2
        className="section-title"
        style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 'var(--space-4)',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function MbtiResults() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const [result, setResult] = useState<StoredMbtiResult | null>(null);

  useEffect(() => {
    // 1. Try router navigation state
    const stateResult = location.state as StoredMbtiResult | null;
    if (stateResult && stateResult.type && stateResult.type.length === 4) {
      setResult(stateResult);
      return;
    }
    // 2. Fallback to localStorage
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
          data-testid="mbti-retake-button"
          onClick={() => navigate('/mbti')}
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

  // ── Resolve data ──
  const mbtiType = result.type;
  const typeDesc = mbtiTypeDescriptions[mbtiType];

  // Prefer stored data but fall back to derived values
  const typeGroup: string =
    result.typeGroup ?? typeDesc?.typeGroup ?? 'analyst';
  const groupColor = TYPE_GROUP_COLORS[typeGroup] ?? 'var(--accent-primary)';

  // Preferences: use stored array, or derive from dichotomies
  const preferences: DichotomyPreference[] =
    result.preferences && result.preferences.length > 0
      ? result.preferences
      : preferencesFromDichotomies(result.dichotomies);

  // Cognitive stack: use stored, or fall back to typeDesc
  const cognitiveStack: CognitiveFunction[] =
    result.cognitiveStack && result.cognitiveStack.length > 0
      ? result.cognitiveStack
      : typeDesc?.cognitive_functions ?? [];

  // Type names
  const typeName = typeDesc
    ? locale === 'zh'
      ? typeDesc.name.zh
      : typeDesc.name.en
    : mbtiType;

  const typeTagline = typeDesc
    ? locale === 'zh'
      ? typeDesc.tagline.zh
      : typeDesc.tagline.en
    : '';

  const typeOverview = typeDesc
    ? locale === 'zh'
      ? typeDesc.overview.zh
      : typeDesc.overview.en
    : '';

  const strengths = typeDesc
    ? locale === 'zh'
      ? typeDesc.strengths.zh
      : typeDesc.strengths.en
    : [];

  const weaknesses = typeDesc
    ? locale === 'zh'
      ? typeDesc.weaknesses.zh
      : typeDesc.weaknesses.en
    : [];

  const growthAreas = typeDesc
    ? locale === 'zh'
      ? typeDesc.growth_areas.zh
      : typeDesc.growth_areas.en
    : [];

  const careerPaths = typeDesc
    ? locale === 'zh'
      ? typeDesc.career_paths.zh
      : typeDesc.career_paths.en
    : [];

  const communicationStyle = typeDesc
    ? locale === 'zh'
      ? typeDesc.communication_style.zh
      : typeDesc.communication_style.en
    : '';

  // Type group label e.g. "Analyst · NT Group"
  const groupLabel =
    locale === 'zh'
      ? `${t(`mbti.groups.${typeGroup}`)} · ${typeGroup === 'analyst' ? 'NT' : typeGroup === 'diplomat' ? 'NF' : typeGroup === 'sentinel' ? 'SJ' : 'SP'} 型组`
      : `${t(`mbti.groups.${typeGroup}`)} · ${typeGroup === 'analyst' ? 'NT' : typeGroup === 'diplomat' ? 'NF' : typeGroup === 'sentinel' ? 'SJ' : 'SP'} Group`;

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

      {/* ── A. Type Hero ── */}
      <section
        data-testid="mbti-primary-type"
        style={{
          textAlign: 'center',
          padding: 'var(--space-8)',
          background: 'var(--bg-card)',
          border: `1px solid ${groupColor}`,
          borderRadius: 'var(--radius-xl)',
          boxShadow: `0 0 40px ${groupColor}22`,
        }}
      >
        {/* 4-letter type */}
        <div
          data-testid="mbti-type"
          style={{
            fontSize: 'clamp(4rem, 12vw, 7rem)',
            fontWeight: '800',
            lineHeight: '1',
            color: groupColor,
            letterSpacing: '-0.04em',
          }}
        >
          {mbtiType}
        </div>

        {/* Type name */}
        <div
          data-testid="type-name"
          className="type-name mbti-type-name"
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

        {/* Type group badge */}
        <div
          style={{
            display: 'inline-block',
            marginTop: 'var(--space-4)',
            padding: 'var(--space-2) var(--space-4)',
            background: `${groupColor}22`,
            border: `1px solid ${groupColor}66`,
            borderRadius: 'var(--radius-md)',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: groupColor,
            letterSpacing: '0.02em',
          }}
        >
          {groupLabel}
        </div>
      </section>

      {/* ── B. Preference Strength Bars ── */}
      <Section id="preference-bars" title={t('mbti.results.preferenceStrengths')}>
        <PreferenceStrengthBars preferences={preferences} />
      </Section>

      {/* ── C. Cognitive Function Stack ── */}
      <Section id="cognitive-functions" title={t('mbti.results.cognitiveStack')}>
        <CognitiveFunctionStack
          cognitiveStack={cognitiveStack}
          locale={locale}
          typeGroup={typeGroup}
        />
      </Section>

      {/* ── D. Overview ── */}
      <Section id="type-overview" title={t('mbti.results.overview')}>
        <div
          data-testid="type-description"
          className="type-overview type-description"
          style={{
            color: 'var(--text-secondary)',
            lineHeight: '1.75',
            whiteSpace: 'pre-line',
          }}
        >
          {typeOverview}
        </div>
      </Section>

      {/* ── E. Strengths ── */}
      <Section id="strengths-section" title={t('mbti.results.strengths')}>
        <ul
          className="tag-list"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            listStyle: 'none',
          }}
        >
          {strengths.map((item, idx) => (
            <li
              key={idx}
              className="tag"
              style={{
                padding: 'var(--space-2) var(--space-3)',
                background: `${groupColor}18`,
                border: `1px solid ${groupColor}44`,
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* ── F. Blind Spots / Weaknesses ── */}
      <Section id="weaknesses-section" title={t('mbti.results.weaknesses')}>
        <ul
          className="tag-list"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            listStyle: 'none',
          }}
        >
          {weaknesses.map((item, idx) => (
            <li
              key={idx}
              className="tag"
              style={{
                padding: 'var(--space-2) var(--space-3)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* ── G. Growth Areas ── */}
      <Section id="growth-areas" title={t('mbti.results.growthAreas')}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          {growthAreas.map((area, idx) => (
            <div
              key={idx}
              style={{
                padding: 'var(--space-4)',
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                borderLeft: `3px solid ${groupColor}`,
              }}
            >
              <div
                style={{
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-2)',
                  fontSize: '0.95rem',
                }}
              >
                {area.title}
              </div>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  lineHeight: '1.65',
                  margin: 0,
                }}
              >
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── H. Career Paths ── */}
      <Section id="career-paths" title={t('mbti.results.careerPaths')}>
        <ul
          className="tag-list"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            listStyle: 'none',
          }}
        >
          {careerPaths.map((career, idx) => (
            <li
              key={idx}
              className="tag"
              style={{
                padding: 'var(--space-2) var(--space-3)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
              }}
            >
              {career}
            </li>
          ))}
        </ul>
      </Section>

      {/* ── I. Communication Style ── */}
      <Section id="communication-style" title={t('mbti.results.communicationStyle')}>
        <p
          style={{
            color: 'var(--text-secondary)',
            lineHeight: '1.75',
            margin: 0,
          }}
        >
          {communicationStyle}
        </p>
      </Section>

      {/* ── J. Action Buttons ── */}
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
          onClick={() => navigate('/mbti')}
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
          onClick={() => {
            const mainEl = document.querySelector('[data-pdf-content]') as HTMLElement;
            exportMbtiResultAsPdf(mbtiType, locale, mainEl);
          }}
          style={{
            padding: 'var(--space-3) var(--space-8)',
            background: 'var(--accent-primary)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t('buttons.exportPdf')}
        </button>
      </section>
    </main>
  );
}
