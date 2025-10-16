import { FC } from 'react';
import { removeDBData } from '@/features/Create/model';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { generatePassword } from '@/shared/lib/utils/generate';
import { AccountCreate } from '@/shared/types/types';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Switch from '@/shared/ui/Switch';
import { AccountCreateData, CreateCardProps } from '@/widgets/CreateCard/CreateCardModal';

const titleMapper: Record<keyof AccountCreate, string> = {
  title: 'card_title',
  login: 'login',
  password: 'password',
  url: 'website_url',
  notes: 'notes',
  safety: 'safety_mode'
};

const CreateAccount: FC<CreateCardProps<AccountCreateData>> = ({ cardData, onChange }) => {
  const { t } = useTranslations();

  const data = removeDBData<AccountCreateData>(cardData);

  const setGeneratedPassword = () => {
    const generatedPassword = generatePassword();
    onChange('password', generatedPassword);
  };

  return (
    <>
      {Object.keys(data).map((field, i) => {
        if (field === 'notes' || field === 'safety') {
          return null;
        }

        const fieldName = field as keyof Omit<AccountCreate, 'notes' | 'safety'>;
        const fieldTitle = t(titleMapper[fieldName]);
        const suffix = fieldName === 'password' && (
          <Button type="default" className="px-0" onClick={setGeneratedPassword}>
            {t('generate')}
          </Button>
        );

        return (
          <div key={fieldName} className="flex flex-col">
            <span className="capitalize mb-1">{fieldTitle}</span>
            <Input
              value={data[fieldName] ?? ''}
              placeholder={`${t('enter')} ${fieldTitle.toLowerCase()}`}
              suffix={suffix}
              autoFocus={i === 0}
              onChange={(newValue) => onChange(fieldName, newValue)}
            />
          </div>
        );
      })}

      <div className="flex flex-col">
        <span className="capitalize mb-1">{t('notes')}</span>
        <textarea
          className="min-h-(--field-height) border border-border rounded-field px-3 py-2 outline-none hover:border-green-main focus-within:border-green-main overflow-hidden"
          value={data.notes}
          placeholder={t('enter_notes')}
          onChange={(e) => onChange('notes', e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <span className="capitalize mb-1">{`${t('safety_mode')}: ${data.safety ? 'ON' : 'OFF'}`}</span>
        <Switch checked={data.safety} onChange={(checked) => onChange('safety', checked)} />
      </div>
    </>
  );
};

export default CreateAccount;
