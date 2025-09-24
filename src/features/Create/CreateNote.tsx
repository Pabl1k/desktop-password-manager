import { FC, useState } from 'react';
import CreateModalButtons from '@/features/Create/CreateModalButtons';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { NoteCardCreate } from '@/shared/types/types';
import Input from '@/shared/ui/Input';
import Switch from '@/shared/ui/Switch';

interface Props {
  onClose: () => void;
  onSave: (card: NoteCardCreate) => void;
}

const initialCardData = {
  title: '',
  note: '',
  safety: false
};

const CreateNote: FC<Props> = ({ onClose, onSave }) => {
  const { t } = useTranslations();
  const [newCardData, setNewCardData] = useState<NoteCardCreate>(initialCardData);

  const handleSave = () => {
    onSave(newCardData);
    onClose();
    setNewCardData(initialCardData);
  };

  const handleCancel = () => {
    onClose();
    setNewCardData(initialCardData);
  };

  return (
    <>
      <div className="flex flex-col">
        <span className="capitalize mb-1">{t('card_title')}</span>
        <Input
          value={newCardData.title}
          placeholder={`${t('enter')} ${t('card_title')}`}
          onChange={(newValue) =>
            setNewCardData((prevState) => ({ ...prevState, title: newValue }))
          }
        />
      </div>

      <div className="flex flex-col">
        <span className="capitalize mb-1">{t('note')}</span>
        <textarea
          className="min-h-(--field-height) border border-border rounded-field px-3 py-2 outline-none hover:border-green-main focus-within:border-green-main overflow-hidden"
          value={newCardData.note}
          placeholder={t('enter_notes')}
          onChange={(e) => setNewCardData((prevState) => ({ ...prevState, note: e.target.value }))}
        />
      </div>

      <div className="flex flex-col">
        <span className="capitalize mb-1">{`${t('safety_mode')}: ${newCardData.safety ? 'ON' : 'OFF'}`}</span>
        <Switch
          checked={newCardData.safety}
          onChange={(checked) => setNewCardData((prevState) => ({ ...prevState, safety: checked }))}
        />
      </div>

      <CreateModalButtons saveDisabled={false} onSave={handleSave} onCancel={handleCancel} />
    </>
  );
};

export default CreateNote;
