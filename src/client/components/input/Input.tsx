import { FC } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Input: FC<Props> = ({ value, placeholder, onChange }) => {
  return (
    <input
      className={clsx(styles.input, 'rounded-md cursor-pointer pl-3')}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
