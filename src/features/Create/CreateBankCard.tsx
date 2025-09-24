import { FC } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { BankCardCreate } from '@/shared/types/types';
import Input from '@/shared/ui/Input';
import Switch from '@/shared/ui/Switch';
import { CreateCardProps } from '@/widgets/CreateCard/CreateCardModal';

const titleMapper: Record<keyof BankCardCreate, string> = {
  title: 'card_title',
  cardNumber: 'card_number',
  cardholder: 'cardholder',
  expirationDate: 'expiration_date',
  cvv: 'cvv',
  notes: 'notes',
  safety: 'safety_mode'
};

const CreateBankCard: FC<CreateCardProps<BankCardCreate>> = ({ cardData, onChange }) => {
  const { t } = useTranslations();

  return (
    <>
      {Object.keys(cardData).map((field) => {
        if (field === 'notes' || field === 'safety') {
          return null;
        }

        const fieldName = field as keyof Omit<BankCardCreate, 'notes' | 'safety'>;
        const fieldTitle = t(titleMapper[fieldName]);

        return (
          <div key={fieldName} className="flex flex-col">
            <span className="capitalize mb-1">{fieldTitle}</span>
            <Input
              value={cardData[fieldName] ?? ''}
              placeholder={`${t('enter')} ${fieldTitle.toLowerCase()}`}
              onChange={(newValue) => onChange(fieldName, newValue)}
            />
          </div>
        );
      })}

      <div className="flex flex-col">
        <span className="mb-1">{t('notes')}</span>
        <textarea
          className="min-h-(--field-height) border border-border rounded-field px-3 py-2 outline-none hover:border-green-main focus-within:border-green-main overflow-hidden"
          value={cardData.notes}
          placeholder={t('enter_notes')}
          onChange={(e) => onChange('notes', e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <span className="capitalize mb-1">{`${t('safety_mode')}: ${cardData.safety ? 'ON' : 'OFF'}`}</span>
        <Switch checked={cardData.safety} onChange={(checked) => onChange('safety', checked)} />
      </div>
    </>
  );
};

export default CreateBankCard;
