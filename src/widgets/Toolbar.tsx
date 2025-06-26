import { FC, useState } from 'react';
import CreateAccount from '@/features/Create/CreateAccount';
import CreateBankCard from '@/features/Create/CreateBankCard';
import CreateNote from '@/features/Create/CreateNote';
import { IAccountCardCreate } from '@/shared/types/types';
import { MainView } from '@/shared/types/view';
import CreateCardModal from '@/widgets/CreateCardModal';

interface Props {
  view: MainView;
  onNewCardCreate: (newCard: IAccountCardCreate) => Promise<void>;
}

const Toolbar: FC<Props> = ({ view, onNewCardCreate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  const displayContentByView = () => {
    if (view === 'main-bank_cards') {
      return <CreateBankCard onClose={closeModal} />;
    }

    if (view === 'main-notes') {
      return <CreateNote onClose={closeModal} />;
    }

    return <CreateAccount onClose={closeModal} onSave={onNewCardCreate} />;
  };

  return (
    <div className="h-[85px] bg-bg-toolbar border-b border-section-border flex items-center p-6">
      <CreateCardModal open={modalOpen} openModal={() => setModalOpen(true)} onClose={closeModal}>
        {displayContentByView()}
      </CreateCardModal>
    </div>
  );
};

export default Toolbar;
