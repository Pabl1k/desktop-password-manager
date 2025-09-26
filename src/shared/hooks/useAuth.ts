import { useState } from 'react';
import { CACHE_KEYS } from '../lib/storage/storageKeys';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { get } = useLocalStorage();
  const loginCode = get<string | undefined>('loginCode');
  const safetyCode = get<string | undefined>('safetyCode');

  const [userLoggedIn, setLoggedIn] = useState<boolean>(() => {
    const value = sessionStorage.getItem(CACHE_KEYS.loggedIn);

    return value && JSON.parse(value);
  });
  const [showError, setShowError] = useState(false);

  const loginRequired = Boolean(loginCode) && !userLoggedIn;

  // const runSafety = () => {}

  const handlePasscode = (passcode: string) => {
    if (passcode !== loginCode && passcode !== safetyCode) {
      setShowError(true);
      return;
    }

    if (passcode === safetyCode) {
      console.log('SAFETY MODE');
      // runSafety();
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
