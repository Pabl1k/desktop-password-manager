import { FC, ReactNode, useRef } from 'react';
import { useTranslations } from '../translations/useTranslations';
import { useOutsideClick } from '../useOutsideClick';
import Button from './Button';

export interface DropdownOption {
  labelKey: string;
  onClick: () => void;
}

interface Props {
  open: boolean;
  options: DropdownOption[];
  children: ReactNode;
  onClose: () => void;
}

const DropdownMenu: FC<Props> = ({ open, options, children, onClose }) => {
  const { t } = useTranslations();
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, onClose);

  return (
    <div ref={ref} className="relative">
      {children}
      {open && (
        <div className="absolute left-0 bg-bg-card rounded-field border border-border shadow-lg">
          {options.map(({ labelKey, onClick }) => (
            <Button
              key={labelKey}
              type="transparent"
              className="w-full font-semibold text-start"
              onClick={onClick}
            >
              {t(labelKey)}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
