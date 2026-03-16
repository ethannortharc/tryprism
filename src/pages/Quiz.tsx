import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { questions } from '../data/questions';
import { scoreAnswers } from '../lib/scoring';
import { saveResult } from '../lib/storage';
import type { Answer } from '../types/index';
import ProgressBar from '../components/ProgressBar';
import Question from '../components/Question';
import LikertScale from '../components/LikertScale';

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, locale } = useI18n();

  const mode = (searchParams.get('mode') ?? 'quick') as 'quick' | 'full';

  // Filter questions based on mode
  const quizQuestions = useMemo(() => {
    if (mode === 'full') {
      return questions;
    }
    // Quick mode: only 'both' questions (54 questions)
    return questions.filter((q) => q.mode === 'both');
  }, [mode]);

  const total = quizQuestions.length;

  // Current question index (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Map of questionId -> selected value (1–5)
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = quizQuestions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] ?? null : null;

  // Likert labels from i18n
  const likertLabels = [
    t('quiz.likert1'),
    t('quiz.likert2'),
    t('quiz.likert3'),
    t('quiz.likert4'),
    t('quiz.likert5'),
  ];

  const handleSelectAnswer = (value: number) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Last question: score and navigate
      const answerList: Answer[] = quizQuestions.map((q) => ({
        questionId: q.id,
        questionType: q.type,
        value: answers[q.id] ?? 3, // default neutral if skipped
      }));

      const result = scoreAnswers(answerList);
      const stored = {
        ...result,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        takenAt: new Date().toISOString(),
        mode,
      };
      saveResult(stored);
      // Also persist as the latest single result so Results page can load it
      try {
        localStorage.setItem('tryprism_latest_result', JSON.stringify(stored));
      } catch {
        // quota exceeded or unavailable — ignore
      }

      navigate('/results', { state: stored });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  if (!currentQuestion) {
    return (
      <main style={{ padding: 'var(--space-8)', minHeight: '100vh' }}>
        <p>No questions found.</p>
      </main>
    );
  }

  return (
    <main
      className="page-enter"
      role="main"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8) var(--space-6)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
        }}
      >
        {/* Progress bar */}
        <ProgressBar current={currentIndex + 1} total={total} />

        {/* Question card */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-8)',
            marginBottom: 'var(--space-6)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Question question={currentQuestion} locale={locale} />

          <LikertScale
            value={currentAnswer}
            onChange={handleSelectAnswer}
            labels={likertLabels}
          />
        </div>

        {/* Navigation buttons */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            data-testid="back-button"
            onClick={handleBack}
            disabled={currentIndex === 0}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              background: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              fontSize: '0.9rem',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === 0 ? 0.5 : 1,
              transition: 'all var(--transition-fast)',
            }}
          >
            ← {t('buttons.back')}
          </button>

          <button
            data-testid="next-button"
            onClick={handleNext}
            style={{
              padding: 'var(--space-3) var(--space-8)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid transparent',
              background: 'var(--accent-primary)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 0 0 0 var(--accent-glow)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            {currentIndex === total - 1
              ? t('buttons.start')
              : `${t('buttons.next')} →`}
          </button>
        </div>
      </div>
    </main>
  );
}
