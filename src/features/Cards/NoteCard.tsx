import { FC, memo } from 'react';
import CardTitle from '@/features/Cards/CardTitle';
import { NoteCardData } from '@/shared/types/types';

interface Props extends NoteCardData {
  onEdit: () => void;
  onDelete: () => void;
}

const NoteCard: FC<Props> = ({ title, note, safety, onEdit, onDelete }) => {
  const menuOptions = [
    {
      labelKey: 'edit',
      visible: true,
      onClick: onEdit
    },
    {
      labelKey: 'delete',
      visible: true,
      onClick: onDelete
    }
  ];

  return (
    <div className="w-[280px] bg-bg-card rounded-modal flex flex-col">
      <CardTitle title={title} safety={safety} cardOptions={menuOptions} />

      <div className="h-[300px] custom-scroll overflow-auto my-2 px-4">{note}</div>
    </div>
  );
};

export default memo(NoteCard, () => true);
