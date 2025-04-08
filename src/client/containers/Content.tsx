import { FC } from 'react';
import Card from '../components/card/Card';
import { WebsiteCard } from '../types/types';

interface Props {
  cards: WebsiteCard[];
  onDeleteCard: (id: string) => void;
}

const Content: FC<Props> = ({ cards, onDeleteCard }) => {
  return (
    <div className="h-[calc(100vh-85px)] flex flex-wrap gap-4 p-6 overflow-auto">
      {cards.map((item) => (
        <Card
          key={item.id}
          login={item.login}
          link={item.url}
          title={item.sourceName}
          password={item.password}
          onDelete={() => onDeleteCard(item.id)}
        />
      ))}
    </div>
  );
};

export default Content;
