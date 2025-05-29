import { FC } from 'react';
import CardTitle from '@/features/Cards/CardTitle';

// create global type
interface Props {
  title: string;
  content: string;
  onDelete: () => void;
}

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
      <CardTitle title={title} cardOptions={menuOptions} />

      <div className="h-[300px] custom-scroll overflow-auto my-2 px-4">{content}</div>
    </div>
  );
};

export default NoteCard;
