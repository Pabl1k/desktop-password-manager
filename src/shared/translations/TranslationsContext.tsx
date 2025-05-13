import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { firebaseConfig } from '@/shared/config/firebase';
import defaultTranslations from '../config/en.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

type Translations = Record<string, string>;

interface TranslationContextType {
  translations: Translations | null;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const language = 'en'; // Fix after language settings implementation
  const [translations, setTranslations] = useState<Translations | null>(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const docRef = doc(db, 'translations', language);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error(`Translations: ${language} does not exist`);
        }

        setTranslations(docSnap.data());
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    if (language !== 'en') {
      fetchTranslations();
    }
  }, [language]);

  const memoizedTranslations = useMemo(
    () => translations ?? (defaultTranslations as Translations),
    [language]
  );

  return (
    <TranslationContext.Provider value={{ translations: memoizedTranslations }}>
      {children}
    </TranslationContext.Provider>
  );
};
