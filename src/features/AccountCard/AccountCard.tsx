import { FC, memo, useState } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { uniqueId } from '@/shared/lib/utils/generate';
import { copyToClipboard, getLinkHostname, openExternally } from '@/shared/lib/utils/link';
import Button from '@/shared/ui/Button';
import CardNotes from '@/shared/ui/CardNotes';
import DropdownMenu, { DropdownOption } from '@/shared/ui/DropdownMenu';
import Icon from '@/shared/ui/Icon';
import IconButton from '@/shared/ui/IconButton';

interface Props {
  title: string;
  link: string;
  login: string;
  password: string;
  notes: string;
  onDelete: () => void;
}

const hiddenPassword = Array.from({ length: 16 }).map(() => <span key={uniqueId()}>&#x2022;</span>);

const AccountCard: FC<Props> = ({ title, link, login, password, notes, onDelete }) => {
  const { t } = useTranslations();

  const [showPassword, setShowPassword] = useState(false);
  const [displayNotes, setDisplayNotes] = useState(false);

  const cardOptions: DropdownOption[] = [
    {
      labelKey: 'open_notes',
      visible: Boolean(notes),
      onClick: () => setDisplayNotes(true)
    },
    {
      labelKey: 'copy_link',
      visible: Boolean(link),
      onClick: () => copyToClipboard(link)
    },
    {
      labelKey: 'delete',
      visible: true,
      onClick: onDelete
    }
  ];

  const displayPasswordFieldValue = showPassword ? password : hiddenPassword;

  const credentialClassName = 'h-(--field-height) flex items-center justify-between pl-3';

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
        <DropdownMenu options={cardOptions}>
          <Icon name="dotMenu" />
        </DropdownMenu>
      </div>

      {displayNotes ? (
        <CardNotes text={notes} onClose={() => setDisplayNotes(false)} />
      ) : (
        <div className="flex flex-col mx-4 rounded-field text-lg bg-bg-main border border-border">
          <div className={credentialClassName}>
            <span className="truncate mr-2" title={login}>
              {login}
            </span>
            <IconButton iconName="copy" size={20} onClick={() => copyToClipboard(login)} />
          </div>
          <div className="h-px bg-border" />
          <div className={credentialClassName}>
            <span className="truncate mr-2" title={showPassword ? password : undefined}>
              {displayPasswordFieldValue}
            </span>
            <div className="flex">
              <IconButton
                iconName={showPassword ? 'hide' : 'show'}
                onClick={() => setShowPassword(!showPassword)}
              />
              <IconButton iconName="copy" onClick={() => copyToClipboard(password)} />
            </div>
          </div>
        </div>
      )}

      {!displayNotes && (
        <div className="w-full flex justify-center" title={link}>
          {link && (
            <Button className="mb-4" onClick={() => openExternally(link)}>
              {t('open_in_browser')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(AccountCard, () => true);
