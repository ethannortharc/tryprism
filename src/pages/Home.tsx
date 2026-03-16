import { useNavigate } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import HeaderControls from '../components/HeaderControls';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleQuickMode = () => {
    navigate('/quiz?mode=quick', { flushSync: true });
  };

  const handleFullMode = () => {
    navigate('/quiz?mode=full', { flushSync: true });
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

      {/* Branding */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 'var(--space-12)',
        }}
      >
        <h1
          data-testid="app-title"
          style={{
            background: 'linear-gradient(135deg, #7e8be8 0%, #c87ee8 50%, #e87eb8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 'var(--space-4)',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 700,
          }}
        >
          {t('app.title')}
        </h1>

        <p
          data-testid="app-tagline"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          {t('app.tagline')}
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
          {t('mode.selectMode')}
        </p>

        {/* Quick mode */}
        <button
          data-testid="quick-mode-card"
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
              {t('mode.quick')}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            {t('mode.quickDescription')}
          </p>
        </button>

        {/* Full mode */}
        <button
          data-testid="full-mode-card"
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
              {t('mode.full')}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            {t('mode.fullDescription')}
          </p>
        </button>
      </div>
    </main>
  );
}
