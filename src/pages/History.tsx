/**
 * History page — displays past Enneagram and MBTI test results from localStorage.
 *
 * Data-testid attributes:
 *   - history-list            container for result entries
 *   - history-item            each Enneagram result entry
 *   - mbti-history-item       each MBTI result entry
 *   - clear-history-button    clear all button
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { getResults, clearResults, type StoredResult } from '../lib/storage';
import { getMbtiResults } from '../lib/storage';
import type { StoredMbtiResult } from '../types/mbti';
import { mbtiTypeDescriptions } from '../data/mbti/typeDescriptions';

const TYPE_NAMES_EN: Record<number, string> = {
  1: 'The Reformer',
  2: 'The Helper',
  3: 'The Achiever',
  4: 'The Individualist',
  5: 'The Investigator',
  6: 'The Loyalist',
  7: 'The Enthusiast',
  8: 'The Challenger',
  9: 'The Peacemaker',
};

const TYPE_NAMES_ZH: Record<number, string> = {
  1: '改革者',
  2: '助人者',
  3: '成就者',
  4: '个人主义者',
  5: '调查者',
  6: '忠诚者',
  7: '热情者',
  8: '挑战者',
  9: '和平者',
};

function formatDate(iso: string, locale: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

/** Combined history entry discriminated union */
type HistoryEntry =
  | { kind: 'enneagram'; data: StoredResult; takenAt: Date }
  | { kind: 'mbti'; data: StoredMbtiResult & { completedAt?: string }; takenAt: Date };

export default function History() {
  const navigate = useNavigate();
  const { t, locale } = useI18n();
  const typeNames = locale === 'zh' ? TYPE_NAMES_ZH : TYPE_NAMES_EN;

  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const enneagramResults = getResults();
    // getMbtiResults returns StoredMbtiResult[] but stored data may use completedAt
    const mbtiResults = getMbtiResults() as Array<StoredMbtiResult & { completedAt?: string }>;

    const combined: HistoryEntry[] = [
      ...enneagramResults.map((r): HistoryEntry => ({
        kind: 'enneagram',
        data: r,
        takenAt: new Date(r.completedAt ?? r.takenAt),
      })),
      ...mbtiResults.map((r): HistoryEntry => ({
        kind: 'mbti',
        data: r,
        takenAt: new Date(r.takenAt ?? (r as { completedAt?: string }).completedAt ?? 0),
      })),
    ];

    // Sort descending by date (most recent first)
    combined.sort((a, b) => b.takenAt.getTime() - a.takenAt.getTime());
    setEntries(combined);
  }, []);

  const handleClear = () => {
    clearResults();
    // Also clear MBTI results
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('tryprism_mbti_results');
      }
    } catch {
      // ignore
    }
    setEntries([]);
  };

  const handleEnneagramClick = (entry: StoredResult) => {
    navigate('/results', { state: entry });
  };

  const handleMbtiClick = (entry: StoredMbtiResult & { completedAt?: string }) => {
    navigate('/mbti/results', { state: entry });
  };

  return (
    <main
      className="page-enter"
      style={{
        padding: 'var(--space-8) var(--space-6)',
        minHeight: '100vh',
        maxWidth: '720px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
      }}
    >
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '700',
            color: 'var(--text-primary)',
          }}
        >
          {t('history.title')}
        </h1>

        {entries.length > 0 && (
          <button
            data-testid="clear-history-button"
            onClick={handleClear}
            style={{
              padding: 'var(--space-2) var(--space-5)',
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              fontWeight: '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            {t('buttons.clearHistory')}
          </button>
        )}
      </div>

      {/* Back to home */}
      <button
        onClick={() => navigate('/')}
        style={{
          alignSelf: 'flex-start',
          padding: 'var(--space-2) var(--space-4)',
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          fontWeight: '500',
          fontSize: '0.875rem',
          cursor: 'pointer',
        }}
      >
        ← {t('nav.home')}
      </button>

      {/* Entry list or empty state */}
      {entries.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-16) var(--space-8)',
            color: 'var(--text-muted)',
            fontSize: '1rem',
          }}
        >
          {t('history.noHistory')}
        </div>
      ) : (
        <div
          data-testid="history-list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          {entries.map((entry, idx) => {
            if (entry.kind === 'enneagram') {
              const e = entry.data;
              const typeName = typeNames[e.primaryType] ?? `Type ${e.primaryType}`;
              const dateStr = formatDate(e.takenAt, locale);
              const modeLabel = e.mode === 'quick'
                ? t('history.quickMode')
                : t('history.fullMode');

              return (
                <button
                  key={e.id ?? `enneagram-${idx}`}
                  data-testid="history-item"
                  className="history-item result-list-item"
                  onClick={() => handleEnneagramClick(e)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4) var(--space-5)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'border-color 0.15s',
                  }}
                >
                  {/* Type number badge */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: 'var(--radius-md)',
                      background: `var(--type-${e.primaryType})22`,
                      border: `2px solid var(--type-${e.primaryType})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      color: `var(--type-${e.primaryType})`,
                      flexShrink: 0,
                    }}
                  >
                    {e.primaryType}
                  </div>

                  {/* Entry details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Test type label */}
                    <div
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '2px',
                      }}
                    >
                      {locale === 'zh' ? '九型人格' : 'Enneagram'}
                    </div>
                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      {locale === 'zh'
                        ? `${e.primaryType}号 · ${typeName}`
                        : `Type ${e.primaryType} · ${typeName}`}
                    </div>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        gap: 'var(--space-3)',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span>
                        {t('history.takenOn')}: {dateStr}
                      </span>
                      <span
                        style={{
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {modeLabel}
                      </span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                    }}
                  >
                    →
                  </div>
                </button>
              );
            }

            // MBTI entry
            const m = entry.data;
            const mbtiType = m.type;
            const typeDesc = mbtiTypeDescriptions[mbtiType];
            const mbtiTypeName = typeDesc
              ? locale === 'zh'
                ? typeDesc.name.zh
                : typeDesc.name.en
              : mbtiType;
            const dateIso = m.takenAt ?? m.completedAt ?? '';
            const dateStr = dateIso ? formatDate(dateIso, locale) : '';
            const modeLabel = m.mode === 'quick'
              ? t('history.quickMode')
              : t('history.fullMode');
            // Accent color based on type group
            const groupColorMap: Record<string, string> = {
              analyst: 'var(--mbti-analyst)',
              diplomat: 'var(--mbti-diplomat)',
              sentinel: 'var(--mbti-sentinel)',
              explorer: 'var(--mbti-explorer)',
            };
            const groupColor = groupColorMap[m.typeGroup ?? typeDesc?.typeGroup ?? 'analyst'] ?? 'var(--accent-primary)';

            return (
              <button
                key={m.id ?? `mbti-${idx}`}
                data-testid="mbti-history-item"
                className="history-item result-list-item"
                onClick={() => handleMbtiClick(m)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4) var(--space-5)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'border-color 0.15s',
                }}
              >
                {/* 4-letter type badge */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-md)',
                    background: `${groupColor}22`,
                    border: `2px solid ${groupColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    color: groupColor,
                    flexShrink: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {mbtiType}
                </div>

                {/* Entry details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Test type label */}
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '2px',
                    }}
                  >
                    MBTI
                  </div>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {mbtiType} — {mbtiTypeName}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      gap: 'var(--space-3)',
                      flexWrap: 'wrap',
                    }}
                  >
                    {dateStr && (
                      <span>
                        {t('history.takenOn')}: {dateStr}
                      </span>
                    )}
                    <span
                      style={{
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {modeLabel}
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <div
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '1.1rem',
                    flexShrink: 0,
                  }}
                >
                  →
                </div>
              </button>
            );
          })}
        </div>
      )}
    </main>
  );
}
