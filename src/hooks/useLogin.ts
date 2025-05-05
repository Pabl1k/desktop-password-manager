import { useState } from 'react';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import { CACHE_KEYS } from '../shared/lib/storage/storageKeys.js';
import { Settings } from '../types/Settings.js';

export const useLogin = () => {
  const { get } = useLocalStorage();
  const userSettings = get<Settings>('settings');
  const userHasPasscode = userSettings?.passcode;

  const [userLoggedIn, setLoggedIn] = useState<boolean>(() => {
    const value = sessionStorage.getItem(CACHE_KEYS.login);

    return value && JSON.parse(value);
  });

  const loginRequired = Boolean(userHasPasscode) && !userLoggedIn;

  const handleLogin = () => {
    setLoggedIn(true);
    sessionStorage.setItem(CACHE_KEYS.login, JSON.stringify(true));
  };

  return {
    loginRequired,
    handleLogin
  };
};
