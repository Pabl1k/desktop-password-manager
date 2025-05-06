import { FC, ReactNode, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import PortalWrapper from '@/shared/ui/PortalWrapper';

interface Props {
  open: boolean;
  className?: string;
  children: ReactNode;
  outsideClickClose?: () => void;
}

const Modal: FC<Props> = ({ open, className, children, outsideClickClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => outsideClickClose?.());

  if (!open) {
    return null;
  }

  return (
    <PortalWrapper>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div
          ref={ref}
          className={clsx(
            'min-w-[400px] rounded-modal bg-bg-toolbar shadow-[0_0_16px_rgba(0,0,0,0.6)]',
            className
          )}
        >
          {children}
        </div>
      </div>
    </PortalWrapper>
  );
};

export default Modal;
