import { FC, ReactNode, useRef } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick.js';
import { useTranslations } from '../translations/useTranslations';
import Button from './Button';

export interface DropdownOption {
  labelKey: string;
  disabled?: boolean;
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
          {options.map(({ labelKey, disabled, onClick }) => {
            return (
              <Button
                key={labelKey}
                type="transparent"
                className="w-full font-semibold text-start"
                disabled={disabled}
                onClick={onClick}
              >
                {t(labelKey)}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
