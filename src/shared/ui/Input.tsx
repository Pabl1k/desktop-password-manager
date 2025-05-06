import { FC, ReactNode, useState } from 'react';
import clsx from 'clsx';
import IconButton from '@/shared/ui/IconButton';

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
  const [showValue, setShowValue] = useState(() => type === 'text');

  return (
    <div
      className={clsx(
        className,
        'h-(--field-height) flex items-center border border-border rounded-field px-3 cursor-pointer hover:border-green-main focus-within:border-green-main'
      )}
    >
      <input
        type={showValue ? 'text' : 'password'}
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
      {type === 'password' && (
        <IconButton
          iconName={showValue ? 'hide' : 'show'}
          onClick={() => setShowValue(!showValue)}
        />
      )}
      {suffix}
    </div>
  );
};

export default Input;
