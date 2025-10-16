import { FC } from 'react';
import NoteCard from '@/features/Cards/NoteCard';
import { NoteCardData } from '@/shared/types/types';

interface Props {
  card: NoteCardData[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Notes: FC<Props> = ({ card, onEdit, onDelete }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {card.map((data) => (
        <NoteCard
          key={data.id}
          {...data}
          onEdit={() => onEdit(data.id)}
          onDelete={() => onDelete(data.id)}
        />
      ))}
    </div>
  );
};

export default Notes;
