import { useTranslations } from '@/shared/hooks/useTranslations';
import Button from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import Input from '@/shared/ui/Input';
import Tooltip from '@/shared/ui/Tooltip';
import { useSettings } from './useSettings';

const Settings = () => {
  const { t } = useTranslations();

  const { enteredSettings, savedSettings, setEnteredSettings, savePasscode, resetPasscode } =
    useSettings();

  return (
    <div className="p-8">
      <span className="text-2xl">{t('settings')}</span>
      <div className="mt-8 ml-5 flex flex-col gap-4">
        <div>
          <div className="flex">
            <span>{t(savedSettings?.passcode ? 'update_passcode' : 'setup_passcode')}</span>
            <Tooltip className="ml-2" text={t('setup_passcode_tooltip')}>
              <Icon name="info" />
            </Tooltip>
          </div>
          <div className="flex mt-2 gap-2">
            <Input
              value={enteredSettings?.passcode ?? ''}
              placeholder={t('enter_passcode')}
              onChange={(value) =>
                setEnteredSettings((prevState) => ({ ...prevState, passcode: value }))
              }
            />
            <Button
              type="add"
              disabled={
                !enteredSettings?.passcode || savedSettings?.passcode === enteredSettings.passcode
              }
              onClick={savePasscode}
            >
              {t(savedSettings?.passcode ? 'update' : 'setup')}
            </Button>
            <Button disabled={!savedSettings?.passcode} onClick={resetPasscode}>
              {t('reset_passcode')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
