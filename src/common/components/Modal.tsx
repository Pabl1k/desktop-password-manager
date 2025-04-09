import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
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

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div
        className={clsx(
          'min-w-[400px] rounded-modal bg-bg-toolbar text-text-main shadow-[0_0_16px_rgba(0,0,0,0.6)]',
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.getElementById('portal-root') as HTMLElement
  );
};

export default Modal;
