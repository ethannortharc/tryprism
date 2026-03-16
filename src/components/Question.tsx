import type { QuestionEntry } from '../data/questions';

interface QuestionProps {
  question: QuestionEntry;
  locale: string;
}

export default function Question({ question, locale }: QuestionProps) {
  const text =
    locale === 'zh' && question.text.zh
      ? question.text.zh
      : question.text.en;

  return (
    <div
      style={{
        marginBottom: 'var(--space-8)',
      }}
    >
      <p
        data-testid="question-text"
        className="question-text"
        style={{
          fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
          color: 'var(--text-primary)',
          lineHeight: 1.7,
          fontWeight: 400,
        }}
      >
        {text}
      </p>
    </div>
  );
}
