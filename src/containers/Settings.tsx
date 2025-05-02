import { FC, useState } from 'react';
import Button from '../common/components/Button.js';
import Input from '../common/components/Input.js';
import Tooltip from '../common/components/Tooltip.js';
import { useTranslations } from '../common/translations/useTranslations.js';

interface Props {}

const Settings: FC<Props> = ({}) => {
  const { t } = useTranslations();

  const [passcode, setPasscode] = useState<string>('');

  return (
    <div className="p-8">
      <span className="text-2xl">{t('settings')}</span>
      <div className="mt-8 ml-5 flex flex-col gap-4">
        <div>
          <div className="flex items-center">
            <span>{t('setup_passcode')}</span>
            <Tooltip className="ml-2" text={t('setup_passcode_tooltip')} infoIcon />
          </div>
          <div className="flex gap-2">
            <Input value={passcode} placeholder={t('enter_passcode')} onChange={setPasscode} />
            <Button type="add">{t('setup')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
