import { useState } from 'react';
import { useLocalStorage } from '../common/hooks/useLocalStorage.js';

interface Settings {
  passcode: string;
}

export const useSettings = () => {
  const { set } = useLocalStorage();

  const [passcode, setPasscode] = useState('');

  const savePasscode = async () => {
    await set<Settings>('settings', { passcode });
    setPasscode('');
  };

  return {
    passcode,
    setPasscode,
    savePasscode
  };
};
