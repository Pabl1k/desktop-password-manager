import { useState } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { CACHE_KEYS } from '@/shared/lib/storage/storageKeys';

type CodeType = 'loginCode' | 'safetyCode';
type Passcodes = {
  loginCode: string;
  safetyCode: string;
};

const initialValues: Passcodes = { loginCode: '', safetyCode: '' };

export const usePasscode = () => {
  const { get, set, remove } = useLocalStorage();

  const defaultUserCodes: Passcodes = {
    loginCode: get<string>('loginCode') ?? '',
    safetyCode: get<string>('safetyCode') ?? ''
  };

  const [values, setValues] = useState<Passcodes>(initialValues);

  const handleChange = (codeType: CodeType, newValue: string) => {
    setValues((prevState) => ({ ...prevState, [codeType]: newValue }));
  };

  const savePasscode = (codeType: CodeType) => {
    const value = values?.[codeType];

    if (value) {
      set(codeType, value);
    }

    setValues(initialValues);
  };

  const resetPasscode = () => {
    // add code type
    setValues(initialValues);
    remove('loginCode');
    sessionStorage.removeItem(CACHE_KEYS.loggedIn);
  };

  return {
    loginCode: values.loginCode,
    safetyCode: values.safetyCode,
    loginExist: Boolean(defaultUserCodes.loginCode),
    handleChange,
    savePasscode,
    resetPasscode
  };
};
