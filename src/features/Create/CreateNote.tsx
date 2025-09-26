import { FC } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { NoteCardCreate } from '@/shared/types/types';
import Input from '@/shared/ui/Input';
import Switch from '@/shared/ui/Switch';
import { CreateCardProps } from '@/widgets/CreateCard/CreateCardModal';

const CreateNote: FC<CreateCardProps<NoteCardCreate>> = ({ cardData, onChange }) => {
  const { t } = useTranslations();

  return (
    <>
      <div className="flex flex-col">
        <span className="capitalize mb-1">{t('card_title')}</span>
        <Input
          value={cardData.title}
          placeholder={`${t('enter')} ${t('card_title')}`}
          onChange={(newValue) => onChange('title', newValue)}
        />
      </div>

      <div className="flex flex-col">
        <span className="capitalize mb-1">{t('note')}</span>
        <textarea
          className="min-h-(--field-height) border border-border rounded-field px-3 py-2 outline-none hover:border-green-main focus-within:border-green-main overflow-hidden"
          value={cardData.note}
          placeholder={t('enter_notes')}
          onChange={(e) => onChange('note', e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <span className="capitalize mb-1">{`${t('safety_mode')}: ${cardData.safety ? 'ON' : 'OFF'}`}</span>
        <Switch checked={cardData.safety} onChange={(checked) => onChange('safety', checked)} />
      </div>
    </>
  );
};

export default CreateNote;
