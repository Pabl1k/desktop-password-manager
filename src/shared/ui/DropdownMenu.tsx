import { FC, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import PortalWrapper from '@/shared/ui/PortalWrapper';
import { useTranslations } from '../hooks/useTranslations';
import Button from './Button';

export interface DropdownOption {
  labelKey: string;
  disabled?: boolean;
  onClick: () => Promise<void> | void;
}

interface Props {
  options: DropdownOption[];
  children: ReactNode;
}

const DropdownMenu: FC<Props> = ({ options, children }) => {
  const { t } = useTranslations();

  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const displayDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    if (position) {
      setPosition(null);
      return;
    }

    const { top, left, width } = e.currentTarget.getBoundingClientRect();

    setPosition({ top: top, left: left + width / 2 + 20 });
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(target) &&
        !triggerRef.current.contains(target)
      ) {
        setPosition(null);
      }
    };

    if (position) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [position]);

  return (
    <>
      <button ref={triggerRef} onClick={displayDropdown}>
        {children}
      </button>
      {position && (
        <PortalWrapper>
          <div
            ref={dropdownRef}
            className="absolute bg-bg-card rounded-field border border-border shadow-lg"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`
            }}
          >
            {options.map(({ labelKey, disabled, onClick }) => {
              const handleClick = () => {
                onClick();
                setPosition(null);
              };

              return (
                <Button
                  key={labelKey}
                  type="transparent"
                  className="w-full font-semibold text-start"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {t(labelKey)}
                </Button>
              );
            })}
          </div>
        </PortalWrapper>
      )}
    </>
  );
};

export default DropdownMenu;
