import { FC, useState, MouseEvent, KeyboardEvent, ReactNode } from 'react';
import clsx from 'clsx';
import PortalWrapper from '@/shared/ui/PortalWrapper';

interface Props {
  text: string;
  className?: string;
  children: ReactNode;
}

const Tooltip: FC<Props> = ({ text, className, children }) => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  const displayTooltip = (e: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>) => {
    const { top, left, width } = e.currentTarget.getBoundingClientRect();

    setPosition({ top: top - 45, left: left + width / 2 });
  };

  const handleEnterPress = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      displayTooltip(e);
    }
  };

  return (
    <>
      <button
        className={clsx(className, 'flex justify-center items-center focus:outline-green-main')}
        onMouseEnter={displayTooltip}
        onKeyDown={handleEnterPress}
        onMouseLeave={() => setPosition(null)}
        onBlur={() => setPosition(null)}
      >
        {children}
      </button>
      {position && (
        <PortalWrapper>
          <div
            className="absolute bg-bg-sidebar rounded-field py-2 px-4 transform translate-x-[-50%] pointer-events-none"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`
            }}
          >
            {text}
          </div>
        </PortalWrapper>
      )}
    </>
  );
};

export default Tooltip;
