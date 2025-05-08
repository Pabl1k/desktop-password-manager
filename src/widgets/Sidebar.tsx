import { FC, Fragment, useState } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { ContentView } from '@/shared/types/view';
import Button from '@/shared/ui/Button';
import PasswordGeneratorModal from './PasswordGeneratorModal';

interface Props {
  mainView: boolean;
  setView: (view: ContentView) => void;
}

interface Option {
  labelKey: string;
  onClick: () => void;
}

interface SidebarOption extends Option {
  subMenu?: Option[];
}

const APP_VERSION = __APP_VERSION__;

const Sidebar: FC<Props> = ({ mainView, setView }) => {
  const { t } = useTranslations();

  const [passwordGeneratorModalOpen, setPasswordGeneratorModalOpen] = useState(false);

  const mainSubMenuOptions: Option[] = [
    { labelKey: 'accounts', onClick: () => setView('main-accounts') },
    { labelKey: 'bank_cards', onClick: () => setView('main-bank_cards') },
    { labelKey: 'notes', onClick: () => setView('main-notes') }
  ];

  const options: SidebarOption[] = [
    {
      labelKey: 'main',
      subMenu: mainSubMenuOptions,
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

  const renderOption = ({ labelKey, onClick }: Option) => (
    <Button
      key={labelKey}
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
        {options.map((option) => {
          return (
            <Fragment key={option.labelKey}>
              {renderOption(option)}
              {mainView && option.subMenu && (
                <div className="flex flex-col ml-4">
                  {option.subMenu.map((subOption) => renderOption(subOption))}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="flex justify-center">
        <span className="text-sm">{`${t('version')}: ${APP_VERSION}`}</span>
      </div>
    </div>
  );
};

export default Sidebar;
