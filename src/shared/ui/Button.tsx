import { FC, ReactNode, MouseEvent } from 'react';
import clsx from 'clsx';

type ButtonType = 'add' | 'cancel' | 'transparent' | 'default';

interface Props {
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const getStylesByType = (type: ButtonType) => {
  switch (type) {
    case 'cancel':
      return 'border border-border bg-bg-main [&:not(:disabled)]:hover:bg-grey-hover';
    case 'add':
      return 'bg-green-main [&:not(:disabled)]:hover:bg-green-hover';
    case 'transparent':
      return '[&:not(:disabled)]:hover:bg-grey-hover';
    default:
      return '';
  }
};

const Button: FC<Props> = ({ type = 'cancel', className, disabled = false, children, onClick }) => {
  const pxInClassName = className?.includes('px-');

  return (
    <button
      className={clsx(
        'h-(--field-height) rounded-field whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-green-main',
        getStylesByType(type),
        !pxInClassName && 'px-6',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
