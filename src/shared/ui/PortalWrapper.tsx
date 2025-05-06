import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

const PortalWrapper: FC<Props> = ({ children }) => {
  return createPortal(
    <div className="overflow-hidden text-text-main">{children}</div>,
    document.getElementById('portal-root') as HTMLElement
  );
};

export default PortalWrapper;
