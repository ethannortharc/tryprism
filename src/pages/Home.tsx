import { useNavigate } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
  const navigate = useNavigate();
  const { t, locale, toggleLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();

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
      {/* Header controls */}
      <div
        style={{
          position: 'fixed',
          top: 'var(--space-4)',
          right: 'var(--space-6)',
          display: 'flex',
          gap: 'var(--space-3)',
          zIndex: 100,
        }}
      >
        <button
          data-testid="language-toggle"
          aria-label={`Switch language (current: ${locale === 'en' ? 'English' : 'Chinese'})`}
          className="toggle-btn"
          onClick={toggleLocale}
        >
          {locale === 'en' ? '中文' : 'EN'}
        </button>

        <button
          data-testid="theme-toggle"
          aria-label={`Toggle theme (current: ${theme === 'dark' ? 'dark mode' : 'light mode'})`}
          className="toggle-btn"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? '☀' : '☽'}
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
            color: 'var(--text-muted)',
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
          onClick={() => navigate('/quiz?mode=quick')}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--type-7)',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(200, 126, 232, 0.1)',
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
          onClick={() => navigate('/quiz?mode=full')}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--type-5)',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(126, 139, 232, 0.1)',
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
