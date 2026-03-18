import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import HeaderControls from '../../components/HeaderControls';

export default function BigFiveHome() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleQuickMode = () => {
    navigate('/bigfive/quiz?mode=quick');
  };

  const handleFullMode = () => {
    navigate('/bigfive/quiz?mode=full');
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
          data-testid="bigfive-title"
          style={{
            color: 'var(--bigfive-primary)',
            marginBottom: 'var(--space-4)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
          }}
        >
          {t('bigfive.title')}
        </h1>

        <div
          data-testid="bigfive-tagline"
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {t('bigfive.tagline')}
        </div>

        <p
          data-testid="test-description"
          style={{
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.7',
          }}
        >
          {t('bigfive.description')}
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

        {/* Quick mode (IPIP-50) */}
        <button
          data-testid="quick-mode-card"
          className="mode-card"
          onClick={handleQuickMode}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-4)',
            }}
          >
            {/* Badge */}
            <div
              aria-hidden="true"
              style={{
                padding: 'var(--space-1) var(--space-3)',
                background: 'color-mix(in srgb, var(--bigfive-primary) 15%, transparent)',
                border: '1px solid color-mix(in srgb, var(--bigfive-primary) 35%, transparent)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--bigfive-primary)',
                letterSpacing: '0.04em',
                flexShrink: 0,
                alignSelf: 'center',
              }}
            >
              {t('bigfive.modes.quick.badge')}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {t('bigfive.modes.quick.title')}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                {t('bigfive.modes.quick.description')}
              </p>
            </div>
          </div>
        </button>

        {/* Full mode (IPIP-NEO-120) */}
        <button
          data-testid="full-mode-card"
          className="mode-card"
          onClick={handleFullMode}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-4)',
            }}
          >
            {/* Badge */}
            <div
              aria-hidden="true"
              style={{
                padding: 'var(--space-1) var(--space-3)',
                background: 'color-mix(in srgb, var(--bigfive-primary) 15%, transparent)',
                border: '1px solid color-mix(in srgb, var(--bigfive-primary) 35%, transparent)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--bigfive-primary)',
                letterSpacing: '0.04em',
                flexShrink: 0,
                alignSelf: 'center',
              }}
            >
              {t('bigfive.modes.full.badge')}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {t('bigfive.modes.full.title')}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                {t('bigfive.modes.full.description')}
              </p>
            </div>
          </div>
        </button>
      </div>
    </main>
  );
}
