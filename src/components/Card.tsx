import { FC, useState } from 'react';
import Button from '../common/components/Button';
import DropdownMenu, { DropdownOption } from '../common/components/DropdownMenu';
import { useTranslations } from '../common/translations/useTranslations';
import { copyToClipboard, getLinkHostname, openExternally } from '../common/utils';

interface Props {
  title: string;
  link: string;
  login: string;
  password: string;
  onDelete: () => void;
}

const hiddenPassword = Array.from({ length: 16 }).map((_, i) => (
  <span key={i.toString()}>&#x2022;</span>
));

const Card: FC<Props> = ({ title, link, login, password, onDelete }) => {
  const { t } = useTranslations();

  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleDropdownMenuAction = (callback: () => void) => {
    callback();
    setOptionsMenuOpen(false);
  };

  const cardOptions: DropdownOption[] = [
    { labelKey: 'delete', onClick: () => handleDropdownMenuAction(onDelete) },
    {
      labelKey: 'copy_link',
      onClick: () => handleDropdownMenuAction(() => copyToClipboard(link))
    }
  ];

  const displayPasswordFieldValue = showPassword ? password : hiddenPassword;

  return (
    <div className="w-[280px] h-[320px] bg-bg-card rounded-modal flex flex-col justify-between">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex flex-col">
          <span className="text-2xl truncate">{title}</span>
          <span className="text-sm truncate text-green-main" title={link}>
            {getLinkHostname(link)}
          </span>
        </div>
        <DropdownMenu
          open={optionsMenuOpen}
          options={cardOptions}
          onClose={() => setOptionsMenuOpen(false)}
        >
          <div
            className="rotate-90 text-3xl cursor-pointer"
            onClick={() => setOptionsMenuOpen(!optionsMenuOpen)}
          >
            ...
          </div>
        </DropdownMenu>
      </div>

      <div className="flex flex-col mx-4 rounded-field text-lg bg-bg-main border border-border">
        <span className="p-2">{login}</span>
        <div className="h-px bg-border" />
        <div className="flex justify-between p-2">
          <span>{displayPasswordFieldValue}</span>
          <button className="text-sm cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {t(showPassword ? 'hide' : 'show')}
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center" title={link}>
        <Button className="mb-4" onClick={() => openExternally(link)}>
          {t('open_in_browser')}
        </Button>
      </div>
    </div>
  );
};

export default Card;
