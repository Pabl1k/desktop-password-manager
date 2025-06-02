import { FC, useState } from 'react';
import CreateAccount from '@/features/Create/CreateAccount';
import { IAccountCardCreate } from '@/shared/types/types';
import CreateCardModal from '@/widgets/CreateCardModal';

interface Props {
  onNewCardCreate: (newCard: IAccountCardCreate) => Promise<void>;
}

const Toolbar: FC<Props> = ({ onNewCardCreate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  return (
    <div className="h-[85px] bg-bg-toolbar border-b border-section-border flex items-center p-6">
      <CreateCardModal open={modalOpen} openModal={() => setModalOpen(true)} onClose={closeModal}>
        <CreateAccount onClose={closeModal} onSave={onNewCardCreate} />
      </CreateCardModal>
    </div>
  );
};

export default Toolbar;
