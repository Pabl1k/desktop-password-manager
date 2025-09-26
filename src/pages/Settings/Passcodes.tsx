import { usePasscode } from '@/pages/Settings/usePasscode';
import { useTranslations } from '@/shared/hooks/useTranslations';
import Button from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import Input from '@/shared/ui/Input';
import Tooltip from '@/shared/ui/Tooltip';

const Passcodes = () => {
  const { t } = useTranslations();

  const { loginCode, loginExist, handleChange, savePasscode, resetPasscode } = usePasscode();

  return (
    <>
      <div>
        <div className="flex">
          <span>{t('setup_passcode')}</span>
          <Tooltip className="ml-2" text={t('setup_passcode_tooltip')}>
            <Icon name="info" />
          </Tooltip>
        </div>
        <div className="flex mt-2 gap-2">
          <Input
            type="password"
            value={loginCode}
            placeholder={t('enter_passcode')}
            onChange={(value) => handleChange('loginCode', value)}
          />
          <Button type="add" disabled={!loginCode} onClick={() => savePasscode('loginCode')}>
            {t('save')}
          </Button>
          <Button disabled={!loginExist} onClick={resetPasscode}>
            {t('reset_passcode')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Passcodes;
