import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonType = 'add' | 'cancel';

interface Props {
  type?: ButtonType;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const Button: FC<Props> = ({ type = 'cancel', className, children, onClick }) => {
  return (
    <button
      className={clsx(
        styles.button,
        type === 'cancel' ? styles.buttonCancel : styles.buttonAdd,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
