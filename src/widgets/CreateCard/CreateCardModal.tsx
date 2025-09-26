import { FC } from 'react';
import CreateAccount from '@/features/Create/CreateAccount';
import CreateBankCard from '@/features/Create/CreateBankCard';
import CreateModalButtons from '@/features/Create/CreateModalButtons';
import CreateNote from '@/features/Create/CreateNote';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { CollectionKey } from '@/shared/lib/db/dbConfig';
import { AccountCreate, BankCardCreate, NoteCardCreate } from '@/shared/types/types';
import { MainView } from '@/shared/types/view';
import Button from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import Modal from '@/shared/ui/Modal';
import { getModalTitle } from '@/widgets/CreateCard/model';
import { useCreateCard } from '@/widgets/CreateCard/useCreateCard';

export interface CreateCardProps<T> {
  cardData: T;
  onChange: (key: keyof T, value: string | boolean) => void;
}

interface Props {
  view: MainView;
  onCardCreate: <T>(collection: CollectionKey, data: T) => Promise<void>;
}

const CreateCardModal: FC<Props> = ({ view, onCardCreate }) => {
  const { t } = useTranslations();

  const {
    modalOpen,
    newCardData,
    dirty,
    addNewCard,
    handleFieldChange,
    handleSave,
    handleClose,
    handleOutsideClickClose
  } = useCreateCard(view, onCardCreate);

  const displayContentByView = () => {
    if (view === 'main-bank_cards') {
      return (
        <CreateBankCard cardData={newCardData as BankCardCreate} onChange={handleFieldChange} />
      );
    }

    if (view === 'main-notes') {
      return <CreateNote cardData={newCardData as NoteCardCreate} onChange={handleFieldChange} />;
    }

    return <CreateAccount cardData={newCardData as AccountCreate} onChange={handleFieldChange} />;
  };

  return (
    <>
      <Modal
        open={modalOpen}
        className="p-4 flex flex-col gap-4"
        outsideClickClose={handleOutsideClickClose}
      >
        <span className="text-2xl">{getModalTitle(view, t)}</span>

        {displayContentByView()}

        <CreateModalButtons saveDisabled={!dirty} onSave={handleSave} onCancel={handleClose} />
      </Modal>

      <Button type="add" onClick={addNewCard}>
        <div className="flex gap-1">
          <Icon name="add" />
          {t('add')}
        </div>
      </Button>
    </>
  );
};

export default CreateCardModal;
