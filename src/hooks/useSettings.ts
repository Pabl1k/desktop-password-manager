import { useEffect, useState } from 'react';
import { useLocalStorage } from '../common/hooks/useLocalStorage.js';

interface Settings {
  passcode: string;
}

export const useSettings = () => {
  const { get, set, update } = useLocalStorage();

  const [savedSettings, setSavedSettings] = useState<Settings | null>(null);
  const [enteredSettings, setEnteredSettings] = useState<Settings | null>(null);

  const savePasscode = () => {
    if (savedSettings?.passcode) {
      update<Settings>('settings', { passcode: enteredSettings?.passcode ?? '' });
    } else {
      set<Settings>('settings', { passcode: enteredSettings?.passcode ?? '' });
    }

    setSavedSettings((prevState) => ({ ...prevState, passcode: enteredSettings?.passcode ?? '' }));
  };

  const resetPasscode = () => {
    update<Settings>('settings', { passcode: '' });

    setSavedSettings((prevState) => ({ ...prevState, passcode: '' }));
    setEnteredSettings((prevState) => ({ ...prevState, passcode: '' }));
  };

  useEffect(() => {
    const settings = get<Settings | undefined>('settings');

    setSavedSettings(settings ?? null);
  }, []);

  return {
    enteredSettings,
    savedSettings,
    setEnteredSettings,
    savePasscode,
    resetPasscode
  };
};
