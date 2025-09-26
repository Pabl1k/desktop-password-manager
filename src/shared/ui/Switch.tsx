import { FC } from 'react';
import clsx from 'clsx';

type Props = {
  checked: boolean;
  onChange: (enabled: boolean) => void;
};

const Switch: FC<Props> = ({ checked, onChange }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      className={clsx(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer',
        checked ? 'bg-green-main' : 'bg-text-main'
      )}
      onClick={() => onChange(!checked)}
    >
      <span
        className={clsx(
          'inline-block h-4 w-4 transform rounded-full transition-transform',
          checked ? 'bg-text-main translate-x-6' : 'bg-green-main translate-x-1'
        )}
      />
    </button>
  );
};

export default Switch;
