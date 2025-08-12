import { FC, useState } from 'react';
import CreateAccount from '@/features/Create/CreateAccount';
import CreateBankCard from '@/features/Create/CreateBankCard';
import CreateNote from '@/features/Create/CreateNote';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { MainView } from '@/shared/types/view';
import Button from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import Modal from '@/shared/ui/Modal';

interface Props {
  view: MainView;
  onCreate: () => Promise<void>;
}

const CreateCardModal: FC<Props> = ({ view, onCreate }) => {
  const { t } = useTranslations();

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  const getModalTitle = () => {
    switch (view) {
      case 'main-accounts':
        return t('add_account');
      case 'main-bank_cards':
        return t('add_bank_card');
      case 'main-notes':
        return t('add_note');
      default:
        return '';
    }
  };

  const displayContentByView = () => {
    if (view === 'main-bank_cards') {
      return <CreateBankCard onClose={closeModal} />;
    }

    if (view === 'main-notes') {
      return <CreateNote onClose={closeModal} />;
    }

    return <CreateAccount onClose={closeModal} onSave={onCreate} />;
  };

  return (
    <>
      <Modal open={modalOpen} className="p-4 flex flex-col gap-4" outsideClickClose={closeModal}>
        <span className="text-2xl">{getModalTitle()}</span>
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
