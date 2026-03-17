import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import { getQuestionsByMode } from '../../data/mbti/questions';
import { scoreMbti } from '../../lib/mbti/scoring';
import { saveMbtiResult } from '../../lib/storage';
import type { MbtiAnswer } from '../../types/mbti';
import ProgressBar from '../../components/ProgressBar';
import LikertScale from '../../components/LikertScale';
import HeaderControls from '../../components/HeaderControls';

export default function MbtiQuiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, locale } = useI18n();

  const mode = (searchParams.get('mode') ?? 'quick') as 'quick' | 'full';

  const quizQuestions = useMemo(() => getQuestionsByMode(mode), [mode]);
  const total = quizQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = quizQuestions[currentIndex];
  const currentAnswer = currentQuestion ? (answers[currentQuestion.id] ?? null) : null;

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
      // Last question: build answers, score, and save
      const answerList: MbtiAnswer[] = quizQuestions.map((q) => ({
        questionId: q.id,
        dichotomy: q.dichotomy,
        pole: q.pole,
        value: answers[q.id] ?? 3,
      }));

      const scored = scoreMbti(answerList);
      const stored = {
        ...scored,
        testType: 'mbti' as const,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        takenAt: new Date().toISOString(),
        mode,
      };

      saveMbtiResult(stored);

      try {
        localStorage.setItem('tryprism_mbti_latest_result', JSON.stringify(stored));
      } catch {
        // quota exceeded or unavailable — ignore
      }

      navigate('/mbti/results', { state: stored });
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

  const questionText =
    locale === 'zh' && currentQuestion.text.zh
      ? currentQuestion.text.zh
      : currentQuestion.text.en;

  return (
    <main
      className="page-enter"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8) var(--space-6)',
      }}
    >
      <HeaderControls />
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
        }}
      >
        {/* Progress bar */}
        <div data-testid="mbti-progress-bar">
          <ProgressBar current={currentIndex + 1} total={total} />
        </div>

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
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <p
              data-testid="mbti-quiz-question"
              className="question-text"
              style={{
                fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              {questionText}
            </p>
          </div>

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
            data-testid="mbti-back-button"
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
            data-testid="mbti-next-button"
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
