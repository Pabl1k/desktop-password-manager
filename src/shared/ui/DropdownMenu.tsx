import { FC, MouseEvent, ReactNode, KeyboardEvent, useEffect, useRef, useState } from 'react';
import PortalWrapper from '@/shared/ui/PortalWrapper';
import { useTranslations } from '../hooks/useTranslations';
import Button from './Button';

export interface DropdownOption {
  labelKey: string;
  visible: boolean;
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

  const visibleOptions = options.filter(({ visible }) => visible);

  const handleMenuLeave = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      setPosition(null);
    }
  };

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
      <button
        ref={triggerRef}
        className="flex focus:outline-green-main p-2 rounded-full hover:bg-grey-hover cursor-pointer"
        onKeyDown={handleMenuLeave}
        onClick={displayDropdown}
      >
        {children}
      </button>
      {position && (
        <PortalWrapper>
          <div
            ref={dropdownRef}
            className="absolute flex flex-col bg-bg-card rounded-field border border-border shadow-lg"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`
            }}
          >
            {visibleOptions.map(({ labelKey, onClick }) => {
              const handleClick = () => {
                onClick();
                setPosition(null);
              };

              return (
                <Button
                  key={labelKey}
                  type="transparent"
                  className="font-semibold text-start"
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
