import { useContext } from 'react';
import { TranslationContext } from '@/shared/translations/TranslationsContext';

export const useTranslations = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }

  if (!context.translations) {
    console.warn(`Translations not loaded yet, reload the app`);
  }

  const getTranslation = (key: string) => {
    if (!context.translations) {
      return key;
    }

    const translation: string | undefined = context.translations[key];

    if (!translation) {
      console.warn(`Translation "${key}" does not exist"!`);
    }

    return translation ?? key;
  };

  return { t: getTranslation };
};
