import { FC, ReactNode } from 'react';
import styles from './Modal.module.scss';
import clsx from 'clsx';

interface Props {
  open: boolean;
  className?: string;
  children: ReactNode;
  onClose?: () => void;
}

const Modal: FC<Props> = ({ open, className, children }) => {
  if (!open) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={clsx(styles.modal, className)}>{children}</div>
    </div>
  );
};

export default Modal;
