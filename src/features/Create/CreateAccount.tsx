import { FC, useState } from 'react';
import CreateModalButtons from '@/features/Create/CreateModalButtons';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { generatePassword } from '@/shared/lib/utils/generate';
import { AccountCardData, AccountCreate } from '@/shared/types/types';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Switch from '@/shared/ui/Switch';

interface Props {
  onClose: () => void;
  onSave: (newCard: AccountCreate) => Promise<void>;
}

const titleMapper: Record<keyof AccountCreate, string> = {
  title: 'card_title',
  login: 'login',
  password: 'password',
  url: 'website_url',
  notes: 'notes',
  safety: 'safety_mode'
};

const initialCardData: AccountCreate = {
  title: '',
  login: '',
  password: '',
  url: '',
  notes: '',
  safety: false
};

const CreateAccount: FC<Props> = ({ onClose, onSave }) => {
  const { t } = useTranslations();

  const [newCardData, setNewCardData] = useState(initialCardData);

  const fieldsEmpty = Object.keys(newCardData)
    .filter((name) => name !== 'safety')
    .every((name) => !newCardData[name as keyof AccountCreate]);

  const handleChange = (key: keyof AccountCardData, value: string | boolean) => {
    setNewCardData((prevData) => ({
      ...prevData,
      [key]: value
    }));
  };

  const resetCardData = () => {
    setNewCardData(initialCardData);
  };

  const handleSave = async () => {
    await onSave(newCardData); // trim before save
    onClose();
    resetCardData();
  };

  const handleCancel = () => {
    onClose();
    resetCardData();
  };

  const setGeneratedPassword = () => {
    const generatedPassword = generatePassword();
    handleChange('password', generatedPassword);
  };

  return (
    <>
      {Object.keys(initialCardData).map((field) => {
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
              value={newCardData[fieldName] ?? ''}
              placeholder={`${t('enter')} ${fieldTitle.toLowerCase()}`}
              suffix={suffix}
              onChange={(newValue) => handleChange(fieldName, newValue)}
            />
          </div>
        );
      })}

      <div className="flex flex-col">
        <span className="capitalize mb-1">{t('notes')}</span>
        <textarea
          className="min-h-(--field-height) border border-border rounded-field px-3 py-2 outline-none hover:border-green-main focus-within:border-green-main overflow-hidden"
          value={newCardData.notes}
          placeholder={t('enter_notes')}
          onChange={(e) => handleChange('notes', e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <span className="capitalize mb-1">{`${t('safety_mode')}: ${newCardData.safety ? "ON" : "OFF"}`}</span>
        <Switch
          checked={newCardData.safety}
          onChange={(checked) => handleChange('safety', checked)}
        />
      </div>

      <CreateModalButtons saveDisabled={fieldsEmpty} onSave={handleSave} onCancel={handleCancel} />
    </>
  );
};

export default CreateAccount;
