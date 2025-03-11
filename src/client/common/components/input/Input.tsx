import { FC, ReactNode } from 'react';
import styles from './Input.module.scss';

interface Props {
  value: string;
  placeholder?: string;
  suffix?: ReactNode;
  onChange: (value: string) => void;
}

const Input: FC<Props> = ({ value, placeholder, suffix, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      {suffix}
    </div>
  );
};

export default Input;
