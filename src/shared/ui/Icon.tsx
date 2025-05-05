import { FC } from 'react';
import { ReactSVG } from 'react-svg';

interface Props {
  name: string;
  alt?: string;
  height?: number;
  width?: number;
}

const Icon: FC<Props> = ({ name, alt, height = 40, width = 40 }) => {
  const iconPath = `${window.location.origin}/src/shared/assets/icons/${name}.svg`;

  return (
    <ReactSVG
      wrapper="span"
      aria-label={alt ?? `${name}`}
      style={{ lineHeight: 0 }}
      src={iconPath}
      beforeInjection={(svg) => {
        svg.setAttribute('width', width.toString() ?? svg.getAttribute('width') ?? '');
        svg.setAttribute('height', height.toString() ?? svg.getAttribute('height') ?? '');
      }}
    />
  );
};

export default Icon;
