import { useState } from 'react';
import { CACHE_KEYS } from '../lib/storage/storageKeys';
import { Settings } from '../types/Settings';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
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
