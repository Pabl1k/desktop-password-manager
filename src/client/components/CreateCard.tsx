import { FC, MouseEvent, useState } from 'react';
import Button from '../common/components/Button';
import Input from '../common/components/Input';
import Modal from '../common/components/Modal';
import { useTranslations } from '../common/translations/useTranslations';
import { WebsiteCard, WebsiteCardCreate } from '../types/types';
import PasswordGeneratorModal from './PasswordGeneratorModal';

interface Props {
  onSave: (newCard: WebsiteCardCreate) => Promise<void>;
}

const titleMapper: Record<keyof WebsiteCardCreate, string> = {
  sourceName: 'card_title',
  login: 'login',
  password: 'password',
  url: 'website_url',
  notes: 'notes'
};

const initialCardData: WebsiteCardCreate = {
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

  const handleChange = (key: keyof WebsiteCard, value: string) => {
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
      <Modal open={modalOpen} onClose={handleCancel}>
        <div className="p-4 flex flex-col gap-4">
          {Object.keys(initialCardData).map((field) => {
            const fieldName = field as keyof WebsiteCardCreate;
            const fieldTitle = t(titleMapper[fieldName]);
            const suffix = fieldName === 'password' && (
              <button className="text-sm cursor-pointer" onClick={openPasswordGenerationModal}>
                {t('generate')}
              </button>
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
        </div>
        <div className="flex justify-end pr-4 mb-4">
          <Button type="add" onClick={handleSave}>
            {t('save')}
          </Button>
          <Button className="ml-3" onClick={handleCancel}>
            {t('cancel')}
          </Button>
        </div>
      </Modal>
      <Button type="add" onClick={() => setModalOpen(true)}>
        {t('add')}
      </Button>
    </>
  );
};

export default CreateCard;
