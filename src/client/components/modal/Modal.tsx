import { FC, ReactNode, useRef } from 'react';
import styles from './Modal.module.scss';
import clsx from 'clsx';
import { useOutsideClick } from '../../common/useOutsideClick';

interface Props {
  open: boolean;
  className?: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal: FC<Props> = ({ open, className, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(modalRef, onClose);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={clsx(styles.modal, className)}>
        {children}
        <button onClick={onClose}>close</button>
      </div>
    </div>
  );
};

export default Modal;
