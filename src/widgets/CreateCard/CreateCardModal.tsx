import { FC, useState } from 'react';
import CreateAccount from '@/features/Create/CreateAccount';
import CreateBankCard from '@/features/Create/CreateBankCard';
import CreateNote from '@/features/Create/CreateNote';
import { Translation, useTranslations } from '@/shared/hooks/useTranslations';
import { CollectionKey } from '@/shared/lib/db/dbConfig';
import { MainView } from '@/shared/types/view';
import Button from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import Modal from '@/shared/ui/Modal';

interface Props {
  view: MainView;
  onCardCreate: <T>(collection: CollectionKey, data: T) => Promise<void>;
}

const getModalTitle = (view: MainView, t: Translation) => {
  if (view === 'main-accounts') {
    return t('add_account');
  }
  if (view === 'main-bank_cards') {
    return t('add_bank_card');
  }
  if (view === 'main-notes') {
    return t('add_note');
  }
  return '';
};

const CreateCardModal: FC<Props> = ({ view, onCardCreate }) => {
  const { t } = useTranslations();
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  const displayContentByView = () => {
    if (view === 'main-bank_cards') {
      return <CreateBankCard onClose={closeModal} onSave={(newCard) => onCardCreate('bankCards', newCard)} />;
    }

    if (view === 'main-notes') {
      return <CreateNote onClose={closeModal} />;
    }

    return (
      <CreateAccount onClose={closeModal} onSave={(newCard) => onCardCreate('accounts', newCard)} />
    );
  };

  return (
    <>
      <Modal open={modalOpen} className="p-4 flex flex-col gap-4" outsideClickClose={closeModal}>
        <span className="text-2xl">{getModalTitle(view, t)}</span>
        {displayContentByView()}
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

export default CreateCardModal;
