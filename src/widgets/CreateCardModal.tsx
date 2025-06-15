import { FC, ReactNode } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import Button from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import Modal from '@/shared/ui/Modal';

interface Props {
  open: boolean;
  children: ReactNode;
  openModal: () => void;
  onClose: () => void;
}

const CreateCardModal: FC<Props> = ({ open, children, openModal, onClose }) => {
  const { t } = useTranslations();

  return (
    <>
      <Modal open={open} className="p-4 flex flex-col gap-4" outsideClickClose={onClose}>
        {children}
      </Modal>

      <Button type="add" onClick={openModal}>
        <div className="flex gap-1">
          <Icon name="add" />
          {t('add')}
        </div>
      </Button>
    </>
  );
};

export default CreateCardModal;
