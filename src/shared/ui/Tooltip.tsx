import { FC, useRef, useState, MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

interface Props {
  text: string;
  className?: string;
  children: ReactNode;
}

const Tooltip: FC<Props> = ({ text, className, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  const tooltipRef = useRef<HTMLDivElement>(null);

  const displayTooltip = (e: MouseEvent<HTMLSpanElement>) => {
    const { top, left, width } = e.currentTarget.getBoundingClientRect();

    setPosition({ top: top - 40, left: left + width / 2 });
    setVisible(true);
  };

  const resetTooltip = () => {
    setVisible(false);
    setPosition(null);
  };

  return (
    <>
      <span
        className={clsx(className, 'flex justify-center items-center')}
        onMouseEnter={displayTooltip}
        onMouseLeave={resetTooltip}
      >
        {children}
      </span>
      {visible &&
        position &&
        createPortal(
          <div
            ref={tooltipRef}
            className="absolute bg-bg-sidebar text-text-main rounded-field py-2 px-4 transform translate-x-[-50%] pointer-events-none"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`
            }}
          >
            {text}
          </div>,
          document.getElementById('portal-root') as HTMLElement
        )}
    </>
  );
};

export default Tooltip;
