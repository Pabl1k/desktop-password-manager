import { FC, useState } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';

interface Props {
  showError: boolean;
  onEnter: (value: string) => void;
}

const Login: FC<Props> = ({ showError, onEnter }) => {
  const { t } = useTranslations();

  const [enteredPasscode, setEnteredPasscode] = useState('');

  return (
    <div className="w-full flex justify-center items-center bg-bg-main">
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="w-[30vw] min-w-[300px]">
          <Input
            type="password"
            className="w-full"
            value={enteredPasscode}
            placeholder={t('enter_placeholder')}
            onEnterPress={() => onEnter(enteredPasscode)}
            onChange={setEnteredPasscode}
          />
          <div className="h-4">
            {showError && (
              <span className="text-sm text-text-error">{t('incorrect_passcode')}</span>
            )}
          </div>
        </div>

        <Button type="add" disabled={!enteredPasscode} onClick={() => onEnter(enteredPasscode)}>
          {t('login')}
        </Button>
      </div>
    </div>
  );
};

export default Login;
