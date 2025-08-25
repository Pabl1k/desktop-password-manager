import { FC } from 'react';
import BankCard from '@/features/Cards/BankCard';
import { BankCardData } from '@/shared/types/types';

interface Props {
  cards: BankCardData[];
  onDelete: (id: string) => void;
}

const BankCards: FC<Props> = ({ cards, onDelete }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((card) => (
        <BankCard key={card.id} {...card} onDelete={() => onDelete(card.id)} />
      ))}
    </div>
  );
};

export default BankCards;
