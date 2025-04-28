import { FC, useState } from 'react';
import Button from '../common/components/Button';
import { useTranslations } from '../common/translations/useTranslations';
import PasswordGeneratorModal from '../components/PasswordGeneratorModal';
import { ContentView } from '../types/view';

interface Props {
  setView: (view: ContentView) => void;
}

interface SidebarOption {
  labelKey: string;
  onClick: () => void;
}

const APP_VERSION = __APP_VERSION__;

const Sidebar: FC<Props> = ({ setView }) => {
  const { t } = useTranslations();

  const [passwordGeneratorModalOpen, setPasswordGeneratorModalOpen] = useState(false);

  const options: SidebarOption[] = [
    {
      labelKey: 'main',
      onClick: () => setView('main')
    },
    {
      labelKey: 'password_generator',
      onClick: () => setPasswordGeneratorModalOpen(true)
    },
    {
      labelKey: 'recently_deleted',
      onClick: () => setView('recentlyDeleted')
    },
    {
      labelKey: 'settings',
      onClick: () => setView('settings')
    }
  ];

  return (
    <div className="flex flex-col justify-between bg-bg-sidebar border-r border-section-border px-6 pt-10 pb-4">
      <PasswordGeneratorModal
        open={passwordGeneratorModalOpen}
        onClose={() => setPasswordGeneratorModalOpen(false)}
      />
      <div className="flex flex-col gap-2">
        {options.map(({ labelKey, onClick }) => (
          <Button
            key={labelKey}
            type="transparent"
            className="font-semibold text-start"
            onClick={onClick}
          >
            {t(labelKey)}
          </Button>
        ))}
      </div>
      Auto update test again
      <div className="flex justify-center">
        <span className="text-sm">{`${t('version')}: ${APP_VERSION}`}</span>
      </div>
    </div>
  );
};

export default Sidebar;
