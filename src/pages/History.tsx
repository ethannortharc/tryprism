/**
 * History page — displays past Enneagram test results from localStorage.
 *
 * Data-testid attributes:
 *   - history-list        container for result entries
 *   - history-item        each result entry (also used by tests as .history-item)
 *   - clear-history-button clear all button
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { getResults, clearResults, type StoredResult } from '../lib/storage';

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

export default function History() {
  const navigate = useNavigate();
  const { t, locale } = useI18n();
  const typeNames = locale === 'zh' ? TYPE_NAMES_ZH : TYPE_NAMES_EN;

  const [results, setResults] = useState<StoredResult[]>([]);

  useEffect(() => {
    setResults(getResults());
  }, []);

  const handleClear = () => {
    clearResults();
    setResults([]);
  };

  const handleEntryClick = (entry: StoredResult) => {
    navigate('/results', { state: entry });
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

        {results.length > 0 && (
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
      {results.length === 0 ? (
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
          {results.map((entry) => {
            const typeName = typeNames[entry.primaryType] ?? `Type ${entry.primaryType}`;
            const dateStr = formatDate(entry.takenAt, locale);
            const modeLabel = entry.mode === 'quick'
              ? t('history.quickMode')
              : t('history.fullMode');

            return (
              <button
                key={entry.id}
                data-testid="history-item"
                className="history-item result-list-item"
                onClick={() => handleEntryClick(entry)}
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
                    background: `var(--type-${entry.primaryType})22`,
                    border: `2px solid var(--type-${entry.primaryType})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: `var(--type-${entry.primaryType})`,
                    flexShrink: 0,
                  }}
                >
                  {entry.primaryType}
                </div>

                {/* Entry details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {locale === 'zh'
                      ? `${entry.primaryType}号 · ${typeName}`
                      : `Type ${entry.primaryType} · ${typeName}`}
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
          })}
        </div>
      )}
    </main>
  );
}
