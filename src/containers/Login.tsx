import { useState } from 'react';
import Button from '../common/components/Button.js';
import Input from '../common/components/Input.js';
import { useTranslations } from '../common/translations/useTranslations.js';

const Login = () => {
  const { t } = useTranslations();

  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);

  const suffix = (
    <button
      className="text-sm cursor-pointer"
      tabIndex={-1}
      onClick={() => setShowPasscode(!showPasscode)}
    >
      {t(showPasscode ? 'hide' : 'show')}
    </button>
  );

  return (
    <div className="w-full flex justify-center items-center bg-bg-main">
      <div className="w-[30vw] flex flex-col justify-center items-center gap-5">
        <Input
          className="w-full"
          value={passcode}
          placeholder={t('enter_placeholder')}
          suffix={suffix}
          onChange={setPasscode}
        />
        <Button type="add">Login</Button>
      </div>
    </div>
  );
};

export default Login;
