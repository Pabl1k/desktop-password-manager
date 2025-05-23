import { useState } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { Settings } from '@/shared/types/Settings';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const { t } = useTranslations();
  const { get } = useLocalStorage();

  const settings = get<Settings>('settings');
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = () => {
    if (settings.passcode === enteredPasscode) {
      setShowError(false);
      onLogin();
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="w-full flex justify-center items-center bg-bg-main">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-[30vw] ">
          <Input
            type="password"
            className="w-full"
            value={enteredPasscode}
            placeholder={t('enter_placeholder')}
            onEnterPress={handleLogin}
            onChange={setEnteredPasscode}
          />
          {showError && <span className="text-sm text-text-error">{t('incorrect_passcode')}</span>}
        </div>
        <Button type="add" disabled={!enteredPasscode} onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
