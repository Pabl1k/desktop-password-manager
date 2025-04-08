import { FC, ReactNode } from 'react';

interface Props {
  value: string;
  placeholder?: string;
  suffix?: ReactNode;
  onChange: (value: string) => void;
}

const Input: FC<Props> = ({ value, placeholder, suffix, onChange }) => {
  return (
    <div className="h-[40px] flex items-center border border-border rounded-field px-3 cursor-pointer hover:border-green-main focus-within:border-green-main">
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full focus:outline-none"
      />
      {suffix}
    </div>
  );
};

export default Input;
