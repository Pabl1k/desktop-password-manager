import { FC, useState } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { uniqueId } from '@/shared/lib/utils/generate';
import { copyToClipboard, getLinkHostname, openExternally } from '@/shared/lib/utils/link';
import Button from '@/shared/ui/Button';
import DropdownMenu, { DropdownOption } from '@/shared/ui/DropdownMenu';
import Icon from '@/shared/ui/Icon';

interface Props {
  title: string;
  link: string;
  login: string;
  password: string;
  onDelete: () => void;
}

const hiddenPassword = Array.from({ length: 16 }).map(() => <span key={uniqueId()}>&#x2022;</span>);

const Card: FC<Props> = ({ title, link, login, password, onDelete }) => {
  const { t } = useTranslations();

  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleDropdownMenuAction = (callback: () => void) => {
    callback();
    setOptionsMenuOpen(false);
  };

  const cardOptions: DropdownOption[] = [
    {
      labelKey: 'copy_link',
      disabled: !link,
      onClick: () => handleDropdownMenuAction(() => copyToClipboard(link))
    },
    { labelKey: 'delete', onClick: () => handleDropdownMenuAction(onDelete) }
  ];

  const displayPasswordFieldValue = showPassword ? password : hiddenPassword;

  const credentialClassName = 'h-(--field-height) flex items-center justify-between px-3';

  return (
    <div className="w-[280px] h-[320px] bg-bg-card rounded-modal flex flex-col gap-10">
      <div className="h-[80px] flex items-center justify-between px-4 border-b border-border">
        <div className="flex flex-col justify-center">
          <span className="text-2xl truncate">{title}</span>
          {link && (
            <span className="text-sm truncate text-green-main" title={link}>
              {getLinkHostname(link)}
            </span>
          )}
        </div>
        <DropdownMenu
          open={optionsMenuOpen}
          options={cardOptions}
          onClose={() => setOptionsMenuOpen(false)}
        >
          <Icon
            name="dot-menu"
            className="cursor-pointer"
            onClick={() => setOptionsMenuOpen(!optionsMenuOpen)}
          />
        </DropdownMenu>
      </div>

      <div className="flex flex-col mx-4 rounded-field text-lg bg-bg-main border border-border">
        <div className={credentialClassName}>
          <span className="truncate mr-2" title={login}>
            {login}
          </span>
          <Icon
            name="copy"
            className="cursor-pointer"
            size={20}
            onClick={() => copyToClipboard(login)}
          />
        </div>
        <div className="h-px bg-border" />
        <div className={credentialClassName}>
          <span className="truncate mr-2" title={showPassword ? password : undefined}>
            {displayPasswordFieldValue}
          </span>
          <div className="flex gap-2">
            <button
              className="flex cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowPassword(!showPassword);
              }}
            >
              <Icon name={showPassword ? 'hide' : 'show'} size={20} />
            </button>
            <Icon
              name="copy"
              className="cursor-pointer"
              size={20}
              onClick={() => copyToClipboard(password)}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center" title={link}>
        {link && (
          <Button className="mb-4" onClick={() => openExternally(link)}>
            {t('open_in_browser')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
