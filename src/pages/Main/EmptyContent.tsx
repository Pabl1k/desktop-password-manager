import { FC, useState } from 'react';
import CreateAccount from '@/features/Create/CreateAccount';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { IAccountCardCreate } from '@/shared/types/types';
import CreateCardModal from '@/widgets/CreateCardModal';

interface Props {
  onNewCardCreate: (newCard: IAccountCardCreate) => Promise<void>;
}

const EmptyContent: FC<Props> = ({ onNewCardCreate }) => {
  const { t } = useTranslations();
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[50vw] flex flex-col items-center mt-6 gap-4">
        <span className="text-2xl text-center">{t('empty_content_placeholder')}</span>

        <CreateCardModal open={modalOpen} openModal={() => setModalOpen(true)} onClose={closeModal}>
          <CreateAccount onClose={closeModal} onSave={onNewCardCreate} />
        </CreateCardModal>
      </div>
    </div>
  );
};

export default EmptyContent;
