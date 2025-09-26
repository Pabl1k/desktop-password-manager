import { FC, Fragment, useState } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { ContentView } from '@/shared/types/view';
import Button from '@/shared/ui/Button';
import PasswordGeneratorModal from './PasswordGeneratorModal';

interface Props {
  selectedView: ContentView;
  setView: (view: ContentView) => void;
}

interface MenuOption {
  labelKey: string;
  onClick: () => void;
}

interface SidebarMenuOption extends MenuOption {
  subMenu?: MenuOption[];
}

const APP_VERSION = __APP_VERSION__;

const Sidebar: FC<Props> = ({ selectedView, setView }) => {
  const { t } = useTranslations();

  const [passwordGeneratorModalOpen, setPasswordGeneratorModalOpen] = useState(false);
  const submenuOpen = selectedView.includes('main');

  const mainSubMenu: MenuOption[] = [
    { labelKey: 'accounts', onClick: () => setView('main-accounts') },
    { labelKey: 'bank_cards', onClick: () => setView('main-bank_cards') },
    { labelKey: 'notes', onClick: () => setView('main-notes') }
  ];

  const menu: SidebarMenuOption[] = [
    {
      labelKey: 'main',
      subMenu: mainSubMenu,
      onClick: () => setView('main')
    },
    {
      labelKey: 'password_generator',
      onClick: () => setPasswordGeneratorModalOpen(true)
    },
    {
      labelKey: 'recently_deleted',
      onClick: () => setView('recently-deleted')
    },
    {
      labelKey: 'settings',
      onClick: () => setView('settings')
    }
  ];

  const renderOption = ({ labelKey, onClick }: MenuOption) => (
    <Button
      key={labelKey}
      noTab={!submenuOpen}
      type="transparent"
      className="font-semibold text-start"
      onClick={onClick}
    >
      {t(labelKey)}
    </Button>
  );

  return (
    <div className="flex flex-col justify-between bg-bg-sidebar border-r border-section-border px-6 pt-10 pb-4">
      <PasswordGeneratorModal
        open={passwordGeneratorModalOpen}
        onClose={() => setPasswordGeneratorModalOpen(false)}
      />

      <div className="flex flex-col gap-2">
        {menu.map((option) => (
          <Fragment key={option.labelKey}>
            {renderOption(option)}
            <div
              className={`
            ml-4 flex flex-col overflow-hidden transition-all duration-500 
            ${submenuOpen && option.subMenu ? 'opacity-100 translate-y-0 max-h-96' : 'opacity-0 -translate-y-2 max-h-0'}
          `}
            >
              {option.subMenu?.map((subOption) => renderOption(subOption))}
            </div>
          </Fragment>
        ))}
      </div>

      <div className="flex justify-center">
        <span className="text-sm">{`${t('version')}: ${APP_VERSION}`}</span>
      </div>
    </div>
  );
};

export default Sidebar;
