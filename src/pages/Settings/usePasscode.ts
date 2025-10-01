import { useState } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { CACHE_KEYS } from '@/shared/lib/storage/storageKeys';

export type CodeType = 'loginCode' | 'safetyCode';
type Passcodes = {
  loginCode: string;
  safetyCode: string;
};

const initialValues: Passcodes = { loginCode: '', safetyCode: '' };

export const usePasscode = () => {
  const { get, set, remove } = useLocalStorage();

  const loginPasscode = get<string>('loginCode');
  const loginExist = Boolean(loginPasscode);
  const safetyExist = Boolean(get<string>('safetyCode'));

  const [values, setValues] = useState<Passcodes>(initialValues);
  const [resetDisabled, setResetDisabled] = useState({ login: !loginExist, safety: !safetyExist });
  const [safetyFieldDisabled, setSafetyFieldDisabled] = useState(!loginExist);
  const [showSafetyCodeError, setShowSafetyCodeError] = useState(false);

  const handleChange = (codeType: CodeType, newValue: string) => {
    setValues((prevState) => ({ ...prevState, [codeType]: newValue }));
  };

  const saveLoginPasscode = () => {
    if (values.loginCode) {
      set('loginCode', values.loginCode);
    }

    setValues((prevState) => ({ ...prevState, loginCode: '' }));
    setSafetyFieldDisabled(false);
    setResetDisabled((prevState) => ({ ...prevState, login: false }));
  };

  const saveSafetyPasscode = () => {
    if (loginPasscode === values.safetyCode) {
      setShowSafetyCodeError(true);
      return;
    }

    if (values.safetyCode) {
      set('safetyCode', values.safetyCode);
    }

    setValues((prevState) => ({ ...prevState, safetyCode: '' }));
    setSafetyFieldDisabled(false);
    setResetDisabled((prevState) => ({ ...prevState, safety: false }));
  };

  const resetLoginPasscode = () => {
    setValues(initialValues);
    remove('loginCode');
    remove('safetyCode');
    sessionStorage.removeItem(CACHE_KEYS.loggedIn);
    setResetDisabled({ login: true, safety: true });
    setSafetyFieldDisabled(true);
  };

  const resetSafetyPasscode = () => {
    setValues((prevState) => ({ ...prevState, safetyCode: '' }));
    remove('safetyCode');
    setResetDisabled((prevState) => ({ ...prevState, safety: true }));
  };

  return {
    loginCode: values.loginCode,
    safetyCode: values.safetyCode,
    loginExist,
    loginResetDisabled: resetDisabled.login,
    safetyResetDisabled: resetDisabled.safety,
    safetyFieldDisabled,
    showSafetyCodeError,
    handleChange,
    saveLoginPasscode,
    saveSafetyPasscode,
    resetLoginPasscode,
    resetSafetyPasscode
  };
};
