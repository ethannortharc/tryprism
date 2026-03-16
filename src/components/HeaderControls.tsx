import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';

export default function HeaderControls() {
  const { locale, toggleLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();

  return (
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
  );
}
