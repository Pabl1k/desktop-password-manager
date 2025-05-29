import { FC } from 'react';
import { getLinkHostname } from '@/shared/lib/utils/link';
import DropdownMenu, { DropdownOption } from '@/shared/ui/DropdownMenu';
import Icon from '@/shared/ui/Icon';

interface Props {
  title: string;
  link?: string;
  cardOptions: DropdownOption[];
}

const CardTitle: FC<Props> = ({ title, link, cardOptions }) => {
  return (
    <div className="h-[80px] flex items-center justify-between px-4 border-b border-border">
      <div className="flex flex-col justify-center">
        <span className="text-2xl truncate">{title}</span>
        {link && (
          <span className="text-sm truncate text-green-main" title={link}>
            {getLinkHostname(link)}
          </span>
        )}
      </div>
      <DropdownMenu options={cardOptions}>
        <Icon name="dotMenu" />
      </DropdownMenu>
    </div>
  );
};

export default CardTitle;
