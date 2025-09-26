import Passcodes from '@/pages/Settings/Passcodes';
import { useTranslations } from '@/shared/hooks/useTranslations';

const Settings = () => {
  const { t } = useTranslations();

  return (
    <div className="p-8">
      <span className="text-2xl">{t('settings')}</span>
      <div className="mt-8 ml-5 flex flex-col gap-5">
        <Passcodes />
      </div>
    </div>
  );
};

export default Settings;
