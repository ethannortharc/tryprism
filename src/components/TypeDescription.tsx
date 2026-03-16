/**
 * TypeDescription — Renders the detailed bilingual type description.
 */

import { useI18n } from '../contexts/I18nContext';
import typeDescriptions from '../data/typeDescriptions';

interface TypeDescriptionProps {
  typeNumber: number;
}

export default function TypeDescription({ typeNumber }: TypeDescriptionProps) {
  const { locale } = useI18n();
  const desc = typeDescriptions[typeNumber];

  if (!desc) {
    return (
      <div data-testid="type-description" className="type-description">
        <p>Description not available.</p>
      </div>
    );
  }

  const text = locale === 'zh' ? desc.zh : desc.en;

  return (
    <div
      data-testid="type-description"
      className="type-description"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-6)',
        whiteSpace: 'pre-line',
        lineHeight: '1.8',
        color: 'var(--text-secondary)',
      }}
    >
      {text}
    </div>
  );
}
