import { FC } from 'react';
import Card from '@/features/Card/Card';
import { WebsiteCard, WebsiteCardCreate } from '@/shared/types/types';
import EmptyContent from './EmptyContent';

interface Props {
  cards: WebsiteCard[];
  onNewCardCreate: (newCard: WebsiteCardCreate) => Promise<void>;
  onDeleteCard: (id: string) => void;
}

const Content: FC<Props> = ({ cards, onNewCardCreate, onDeleteCard }) => {
  if (!cards.length) {
    return <EmptyContent onNewCardCreate={onNewCardCreate} />;
  }

  return (
    <div className="h-[calc(100vh-85px)] flex flex-wrap gap-4 p-6 overflow-auto custom-scroll">
      {cards.map((item) => (
        <Card
          key={item.id}
          login={item.login}
          link={item.url}
          title={item.sourceName}
          password={item.password}
          notes={item.notes}
          onDelete={() => onDeleteCard(item.id)}
        />
      ))}
    </div>
  );
};

export default Content;
