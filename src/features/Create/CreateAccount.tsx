import { FC, MouseEvent, useState } from 'react';
import CreateModalButtons from '@/features/Create/CreateModalButtons';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { IAccountCard, IAccountCardCreate } from '@/shared/types/types';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import PasswordGeneratorModal from '@/widgets/PasswordGeneratorModal';

interface Props {
  onClose: () => void;
  onSave: (newCard: IAccountCardCreate) => Promise<void>;
}

const titleMapper: Record<keyof IAccountCardCreate, string> = {
  sourceName: 'card_title',
  login: 'login',
  password: 'password',
  url: 'website_url',
  notes: 'notes'
};

const initialCardData: IAccountCardCreate = {
  sourceName: '',
  login: '',
  password: '',
  url: '',
  notes: ''
};

const CreateAccount: FC<Props> = ({ onClose, onSave }) => {
  const { t } = useTranslations();

  const [passwordGenerationModalOpen, setPasswordGenerationModalOpen] = useState(false);
  const [newCardData, setNewCardData] = useState(initialCardData);

  const fieldsEmpty = Object.values(newCardData).every((value) => !value);

  const handleChange = (key: keyof IAccountCard, value: string) => {
    setNewCardData((prevData) => ({
      ...prevData,
      [key]: value
    }));
  };

  const resetCardData = () => {
    setNewCardData(initialCardData);
  };

  const handleSave = async () => {
    await onSave(newCardData);
    onClose();
    resetCardData();
  };

  const handleCancel = () => {
    onClose();
    resetCardData();
  };

  const openPasswordGenerationModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordGenerationModalOpen(true);
  };

  const handleGeneratedPassword = (password: string) => {
    handleChange('password', password);
    setPasswordGenerationModalOpen(false);
  };

  return (
    <>
      <PasswordGeneratorModal
        open={passwordGenerationModalOpen}
        applyButton={{ textKey: 'apply_password', onClick: handleGeneratedPassword }}
        onClose={() => setPasswordGenerationModalOpen(false)}
      />

      {Object.keys(initialCardData).map((field) => {
        if (field === 'notes') {
          return null;
        }

        const fieldName = field as keyof Omit<IAccountCardCreate, 'notes'>;
        const fieldTitle = t(titleMapper[fieldName]);
        const suffix = fieldName === 'password' && (
          <Button type="default" className="px-0" onClick={openPasswordGenerationModal}>
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

      <CreateModalButtons saveDisabled={fieldsEmpty} onSave={handleSave} onCancel={handleCancel} />
    </>
  );
};

export default CreateAccount;
