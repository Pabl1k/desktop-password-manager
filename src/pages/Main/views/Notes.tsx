import { FC } from 'react';
import NoteCard from '@/features/Cards/NoteCard';

interface Props {}

const test = [
  {
    id: '1',
    title: 'Test Note',
    content: 'This is a test note.'
  }
];

const Notes: FC<Props> = ({}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {test.map((note) => (
        <NoteCard key={note.id} {...note} onDelete={() => console.log('delete')} />
      ))}
    </div>
  );
};

export default Notes;
