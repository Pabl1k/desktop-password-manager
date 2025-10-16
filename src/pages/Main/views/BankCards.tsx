import { FC } from 'react';
import BankCard from '@/features/Cards/BankCard';
import { BankCardData } from '@/shared/types/types';

interface Props {
  cards: BankCardData[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const BankCards: FC<Props> = ({ cards, onEdit, onDelete }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((card) => (
        <BankCard
          key={card.id}
          {...card}
          onEdit={() => onEdit(card.id)}
          onDelete={() => onDelete(card.id)}
        />
      ))}
    </div>
  );
};

export default BankCards;
