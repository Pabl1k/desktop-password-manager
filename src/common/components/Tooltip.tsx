import { FC, useRef, useState, MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  text: string;
  className?: string;
  infoIcon?: boolean;
  children?: ReactNode;
}

const Tooltip: FC<Props> = ({ text, className, infoIcon = false, children }) => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: MouseEvent<HTMLSpanElement>) => {
    const { top, left, width } = e.currentTarget.getBoundingClientRect();

    setPosition({ top: top - 40, left: left + width / 2 });
  };

  return (
    <>
      <span
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setPosition(null)}
      >
        {infoIcon ? 'i' : children}
      </span>
      {position &&
        createPortal(
          <div
            ref={tooltipRef}
            className="absolute bg-bg-sidebar text-text-main rounded-field py-2 px-4 whitespace-nowrap transform translate-x-[-50%] pointer-events-none"
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
