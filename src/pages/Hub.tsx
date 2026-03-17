import { useNavigate } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import HeaderControls from '../components/HeaderControls';

export default function Hub() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleEnneagram = () => {
    navigate('/enneagram');
  };

  const handleMbti = () => {
    navigate('/mbti');
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

      {/* Test selection */}
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
          {t('hub.chooseTest')}
        </p>

        {/* Enneagram card */}
        <button
          data-testid="hub-enneagram-card"
          className="mode-card"
          onClick={handleEnneagram}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
            {/* Icon */}
            <div
              aria-hidden="true"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #7e8be8 0%, #e87eb8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
              }}
            >
              ◈
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
                {t('hub.enneagram.name')}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                {t('hub.enneagram.description')}
              </p>
            </div>
          </div>
        </button>

        {/* MBTI card */}
        <button
          data-testid="hub-mbti-card"
          className="mode-card"
          onClick={handleMbti}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
            {/* Icon */}
            <div
              aria-hidden="true"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #9b7ee8 0%, #5ec8a0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
                letterSpacing: '0.02em',
              }}
            >
              MB
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
                {t('hub.mbti.name')}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                {t('hub.mbti.description')}
              </p>
            </div>
          </div>
        </button>
      </div>
    </main>
  );
}
