import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import styles from './Modal.module.scss';

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

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={clsx(styles.modal, className)}>{children}</div>
    </div>,
    document.getElementById('portal-root') as HTMLElement
  );
};

export default Modal;
