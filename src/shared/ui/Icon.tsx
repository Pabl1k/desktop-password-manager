import { FC } from 'react';
import { ReactSVG } from 'react-svg';
import clsx from 'clsx';

interface Props {
  name: string;
  className?: string;
  alt?: string;
  size?: number;
  onClick?: () => void;
}

const Icon: FC<Props> = ({ name, className, alt, size = 25, onClick }) => {
  const iconPath = `${window.location.origin}/src/shared/assets/icons/${name}.svg`;

  return (
    <ReactSVG
      wrapper="span"
      aria-label={alt ?? `${name}`}
      className={clsx(className, 'inline-block leading-none')}
      src={iconPath}
      beforeInjection={(svg) => {
        svg.setAttribute('width', size.toString() ?? svg.getAttribute('width') ?? '');
        svg.setAttribute('height', size.toString() ?? svg.getAttribute('height') ?? '');
      }}
      onClick={onClick}
    />
  );
};

export default Icon;
