import { FC } from 'react';
import clsx from 'clsx';
import { icons } from '../assets/icons/index';

export type IconName = keyof typeof icons;

interface Props {
  name: IconName;
  className?: string;
  alt?: string;
  tooltip?: string;
  size?: number;
  onClick?: () => void;
}

const Icon: FC<Props> = ({ name, className, alt, tooltip, size = 25, onClick }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" does not exist in icons`);
    return null;
  }

  return (
    <span
      aria-label={alt ?? name}
      title={tooltip}
      className={clsx(className, 'inline-block leading-none')}
    >
      <IconComponent width={size} height={size} onClick={onClick} />
    </span>
  );
};

export default Icon;
