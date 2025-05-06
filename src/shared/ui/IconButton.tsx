import { FC } from 'react';
import clsx from 'clsx';
import Icon from '@/shared/ui/Icon';

interface Props {
  iconName: string;
  className?: string;
  size?: number;
  title?: string;
  onClick?: () => void;
}

const IconButton: FC<Props> = ({ iconName, className, size = 20, title, onClick }) => {
  return (
    <button
      className={clsx(
        className,
        'flex p-2 rounded-full hover:bg-grey-hover cursor-pointer focus:outline-green-main'
      )}
      title={title}
      onClick={onClick}
    >
      <Icon name={iconName} size={size} />
    </button>
  );
};

export default IconButton;
