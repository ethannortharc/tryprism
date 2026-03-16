import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Locale, getLocale, setLocale, t as translate } from '../lib/i18n';

interface I18nContextValue {
  locale: Locale;
  t: (key: string) => string;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getLocale());

  const toggleLocale = () => {
    const next: Locale = locale === 'en' ? 'zh' : 'en';
    setLocale(next);
    setLocaleState(next);
  };

  // Wrap translate so React re-renders pick up the right locale
  const t = (key: string): string => {
    // Force call translate with current locale in scope
    // (translate reads from module-level currentLocale which we set via setLocale)
    return translate(key);
  };

  return (
    <I18nContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
