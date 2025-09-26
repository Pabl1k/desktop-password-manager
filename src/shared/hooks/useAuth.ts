import { useState } from 'react';
import { CollectionKey } from '@/shared/lib/db/dbConfig';
import { useDatabase } from '@/shared/lib/db/useDatabase';
import { CACHE_KEYS } from '../lib/storage/storageKeys';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { get } = useLocalStorage();
  const loginCode = get<string | undefined>('loginCode');
  const safetyCode = get<string | undefined>('safetyCode');

  const { state, remove } = useDatabase();

  const [userLoggedIn, setLoggedIn] = useState<boolean>(() => {
    const value = sessionStorage.getItem(CACHE_KEYS.loggedIn);

    return value && JSON.parse(value);
  });
  const [showError, setShowError] = useState(false);

  const loginRequired = Boolean(loginCode) && !userLoggedIn;

  const runSafety = async () => {
    for (const stateKey in state) {
      const key = stateKey as CollectionKey;
      const cards = state[key];

      for (const card of cards) {
        if (card.safety) {
          await remove(key, card.id);
        }
      }
    }
  };

  const handlePasscode = async (passcode: string) => {
    if (passcode !== loginCode && passcode !== safetyCode) {
      setShowError(true);
      return;
    }

    if (passcode === safetyCode) {
      await runSafety();
    }

    setShowError(false);
    setLoggedIn(true);
    sessionStorage.setItem(CACHE_KEYS.loggedIn, JSON.stringify(true));
  };

  return {
    loginRequired,
    showError,
    handlePasscode
  };
};
