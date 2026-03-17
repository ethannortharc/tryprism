import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import HeaderControls from '../../components/HeaderControls';

export default function MbtiHome() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleQuickMode = () => {
    navigate('/mbti/quiz?mode=quick');
  };

  const handleFullMode = () => {
    navigate('/mbti/quiz?mode=full');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <main
      className="page-enter"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8)',
        maxWidth: '720px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <HeaderControls />

      {/* Back to hub */}
      <div
        style={{
          width: '100%',
          marginBottom: 'var(--space-8)',
        }}
      >
        <button
          data-testid="back-to-hub"
          onClick={handleBack}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 500,
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          ← {t('nav.home')}
        </button>
      </div>

      {/* Branding */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 'var(--space-12)',
        }}
      >
        <h1
          data-testid="mbti-title"
          style={{
            color: 'var(--mbti-analyst)',
            marginBottom: 'var(--space-4)',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 700,
          }}
        >
          {t('mbti.title')}
        </h1>

        <p
          data-testid="mbti-subtitle"
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {t('mbti.subtitle')}
        </p>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          {t('mbti.tagline')}
        </p>
      </div>

      {/* Mode selection */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 'var(--space-2)',
          }}
        >
          {t('mbti.mode.selectMode')}
        </p>

        {/* Quick mode */}
        <button
          data-testid="mbti-quick-mode-card"
          className="mode-card"
          onClick={handleQuickMode}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-primary)',
              }}
            >
              {t('mbti.mode.quick')}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            {t('mbti.mode.quickDescription')}
          </p>
        </button>

        {/* Full mode */}
        <button
          data-testid="mbti-full-mode-card"
          className="mode-card"
          onClick={handleFullMode}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-primary)',
              }}
            >
              {t('mbti.mode.full')}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            {t('mbti.mode.fullDescription')}
          </p>
        </button>
      </div>
    </main>
  );
}
