import { FC, useState } from 'react';
import CreateModalButtons from '@/features/Create/CreateModalButtons';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { BankCardCreate } from '@/shared/types/types';
import Input from '@/shared/ui/Input';
import Switch from '@/shared/ui/Switch';

interface Props {
  onClose: () => void;
  onSave: (newCard: BankCardCreate) => Promise<void>;
}

const titleMapper: Record<keyof BankCardCreate, string> = {
  title: 'card_title',
  cardNumber: 'card_number',
  cardholder: 'cardholder',
  expirationDate: 'expiration_date',
  cvv: 'cvv',
  notes: 'notes',
  safety: 'safety_mode'
};

const initialCardData: BankCardCreate = {
  title: '',
  cardNumber: '',
  cardholder: '',
  expirationDate: '',
  cvv: '',
  notes: '',
  safety: false
};

const CreateBankCard: FC<Props> = ({ onClose, onSave}) => {
  const { t } = useTranslations();

  const [newCardData, setNewCardData] = useState(initialCardData);

  const handleChange = (key: keyof BankCardCreate, value: string | boolean) => {
    setNewCardData((prevData) => ({
      ...prevData,
      [key]: value
    }));
  };

  return (
    <>
      {Object.keys(initialCardData).map((field) => {
        if (field === 'notes' || field === 'safety') {
          return null;
        }

        const fieldName = field as keyof Omit<BankCardCreate, 'notes' | 'safety'>;
        const fieldTitle = t(titleMapper[fieldName]);

        return (
          <div key={fieldName} className="flex flex-col">
            <span className="capitalize mb-1">{fieldTitle}</span>
            <Input
              value={newCardData[fieldName] ?? ''}
              placeholder={`${t('enter')} ${fieldTitle.toLowerCase()}`}
              onChange={(newValue) => handleChange(fieldName, newValue)}
            />
          </div>
        );
      })}

      <div className="flex flex-col">
        <span className="mb-1">{t('notes')}</span>
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

      <CreateModalButtons
        saveDisabled={false}
        onSave={() => onSave(newCardData)}
        onCancel={onClose}
      />
    </>
  );
};

export default CreateBankCard;
