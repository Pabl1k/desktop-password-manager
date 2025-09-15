import { FC } from 'react';
import NoteCard from '@/features/Cards/NoteCard';
import { NoteCardData } from '@/shared/types/types';

interface Props {
  card: NoteCardData[];
  onDelete: (id: string) => void;
}

const Notes: FC<Props> = ({ card, onDelete }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {card.map(({ id, title, note }) => (
        <NoteCard key={id} title={title} content={note} onDelete={() => onDelete(id)} />
      ))}
    </div>
  );
};

export default Notes;
