import { FC } from 'react';
import DropdownMenu from '@/shared/ui/DropdownMenu';
import Icon from '@/shared/ui/Icon';

// create global type
interface Props {
  title: string;
  content: string;
  onDelete: () => void;
}

// TODO make reusable title for all cards
const NoteCard: FC<Props> = ({ title, content, onDelete }) => {
  const menuOptions = [
    {
      labelKey: 'delete',
      visible: true,
      onClick: onDelete
    }
  ];

  return (
    <div className="w-[330px] bg-bg-card rounded-modal flex flex-col">
      <div className="h-[80px] flex items-center justify-between px-4 border-b border-border py-2 px-4">
        <span className="text-2xl truncate" title={title}>
          {title}
        </span>
        <DropdownMenu options={menuOptions}>
          <Icon name="dotMenu" />
        </DropdownMenu>
      </div>

      <div className="h-[300px] custom-scroll overflow-auto my-2 px-4">{content}</div>
    </div>
  );
};

export default NoteCard;
