import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  value: string;
  type?: 'text' | 'password';
  className?: string;
  placeholder?: string;
  suffix?: ReactNode;
  onEnterPress?: () => void;
  onChange: (value: string) => void;
}

const Input: FC<Props> = ({
  value,
  type = 'text',
  className,
  placeholder,
  suffix,
  onEnterPress,
  onChange
}) => {
  return (
    <div
      className={clsx(
        className,
        'h-(--field-height) flex items-center border border-border rounded-field px-3 cursor-pointer hover:border-green-main focus-within:border-green-main'
      )}
    >
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnterPress) {
            e.preventDefault();
            onEnterPress();
          }
        }}
      />
      {suffix}
    </div>
  );
};

export default Input;
