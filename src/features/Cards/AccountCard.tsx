import { FC, memo, useState } from 'react';
import CardTitle from '@/features/Cards/CardTitle';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { uniqueId } from '@/shared/lib/utils/generate';
import { copyToClipboard, openExternally } from '@/shared/lib/utils/link';
import { AccountCardData } from '@/shared/types/types';
import Button from '@/shared/ui/Button';
import CardNotes from '@/shared/ui/CardNotes';
import { DropdownOption } from '@/shared/ui/DropdownMenu';
import IconButton from '@/shared/ui/IconButton';

interface Props extends AccountCardData {
  onDelete: () => void;
}

const hiddenPassword = Array.from({ length: 16 }).map(() => <span key={uniqueId()}>&#x2022;</span>);

const AccountCard: FC<Props> = ({ title, url, login, password, notes, safety, onDelete }) => {
  const { t } = useTranslations();

  const [showPassword, setShowPassword] = useState(false);
  const [displayNotes, setDisplayNotes] = useState(false);

  const menuOptions: DropdownOption[] = [
    {
      labelKey: 'open_notes',
      visible: Boolean(notes),
      onClick: () => setDisplayNotes(true)
    },
    {
      labelKey: 'copy_link',
      visible: Boolean(url),
      onClick: () => copyToClipboard(url)
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
      <CardTitle title={title} link={url} safety={safety} cardOptions={menuOptions} />

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
        <div className="w-full flex justify-center" title={url}>
          {url && (
            <Button className="mb-4" onClick={() => openExternally(url)}>
              {t('open_in_browser')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(AccountCard, () => true);
