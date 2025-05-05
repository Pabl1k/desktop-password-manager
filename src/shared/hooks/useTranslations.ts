import { translations } from '../config/translations.js';

export const useTranslations = () => {
  const userLanguage = 'en'; // get from user settings

  const getTranslation = (key: string) => {
    const translation: string | undefined = translations[userLanguage][key];

    if (!translation) {
      console.warn(`Translation "${key}" does not exist"!`);
    }

    return translation ?? key;
  };

  return {
    t: getTranslation
  };
};
