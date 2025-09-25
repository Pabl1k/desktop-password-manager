import { FC } from 'react';
import { getLinkHostname } from '@/shared/lib/utils/link';
import DropdownMenu, { DropdownOption } from '@/shared/ui/DropdownMenu';
import Icon from '@/shared/ui/Icon';

interface Props {
  title: string;
  link?: string;
  safety: boolean;
  cardOptions: DropdownOption[];
}

const CardTitle: FC<Props> = ({ title, link, safety, cardOptions }) => {
  return (
    <div className="h-[80px] flex items-center justify-between px-4 border-b border-border">
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 w-[200px]">
          {safety && <Icon name="lock" tooltip="Safety mode" />}

          <span className="text-2xl truncate" title={title}>
            {title}
          </span>
        </div>

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
