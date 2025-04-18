import { FC, useState } from 'react';
import Button from '../common/components/Button';
import { useTranslations } from '../common/translations/useTranslations';
import PasswordGeneratorModal from '../components/PasswordGeneratorModal';
import { ContentView } from '../types/view';

interface Props {
  setView: (view: ContentView) => void;
}

interface SidebarAction {
  labelKey: string;
  onClick: () => void;
}

const Sidebar: FC<Props> = ({ setView }) => {
  const { t } = useTranslations();

  const [passwordGeneratorModalOpen, setPasswordGeneratorModalOpen] = useState(false);

  const actions: SidebarAction[] = [
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
        {actions.map(({ labelKey, onClick }) => (
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
      <div>
        <Button className="w-full" type="add" onClick={() => console.log('update')}>
          {t('update')}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
