import { FC, MouseEvent, useState } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { IAccountCard, IAccountCardCreate } from '@/shared/types/types';
import Button from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import PasswordGeneratorModal from './PasswordGeneratorModal';

interface Props {
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

const CreateCard: FC<Props> = ({ onSave }) => {
  const { t } = useTranslations();

  const [modalOpen, setModalOpen] = useState(false);
  const [passwordGenerationModalOpen, setPasswordGenerationModalOpen] = useState(false);
  const [newCardData, setNewCardData] = useState(initialCardData);

  const fieldsEmpty = Object.values(newCardData).every((value) => !value);

  const handleChange = (key: keyof IAccountCard, value: string) => {
    setNewCardData((prevData) => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleSave = async () => {
    await onSave(newCardData);
    setModalOpen(false);
    setNewCardData(initialCardData);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setNewCardData(initialCardData);
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
      <Modal open={modalOpen} outsideClickClose={fieldsEmpty ? handleCancel : undefined}>
        <div className="p-4 flex flex-col gap-4">
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
              placeholder={`${t('enter')} ${t('notes').toLowerCase()}`}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end pr-4 mb-4">
          <Button type="add" disabled={fieldsEmpty} onClick={handleSave}>
            {t('save')}
          </Button>
          <Button className="ml-3" onClick={handleCancel}>
            {t('cancel')}
          </Button>
        </div>
      </Modal>
      <Button type="add" onClick={() => setModalOpen(true)}>
        <div className="flex gap-1">
          <Icon name="add" />
          {t('add')}
        </div>
      </Button>
    </>
  );
};

export default CreateCard;
