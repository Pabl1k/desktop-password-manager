import { useState } from 'react';
import { CACHE_KEYS } from '../lib/storage/storageKeys';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { get } = useLocalStorage();
  const loginCode = get<string>('loginCode');

  const [userLoggedIn, setLoggedIn] = useState<boolean>(() => {
    const value = sessionStorage.getItem(CACHE_KEYS.loggedIn);

    return value && JSON.parse(value);
  });

  const loginRequired = Boolean(loginCode) && !userLoggedIn;

  const handleLogin = () => {
    setLoggedIn(true);
    sessionStorage.setItem(CACHE_KEYS.loggedIn, JSON.stringify(true));
  };

  return {
    loginRequired,
    handleLogin
  };
};
