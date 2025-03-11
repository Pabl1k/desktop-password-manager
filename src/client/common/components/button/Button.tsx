import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonType = 'add' | 'cancel' | 'transparent';

interface Props {
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const getStylesByType = (type: ButtonType) => {
  if (type === 'add') {
    return styles.buttonAdd;
  }

  if (type === 'transparent') {
    return styles.buttonTransparent;
  }

  return styles.buttonCancel;
};

const Button: FC<Props> = ({ type = 'cancel', className, disabled = false, children, onClick }) => {
  return (
    <button
      className={clsx(styles.button, disabled && styles.disabled, getStylesByType(type), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
