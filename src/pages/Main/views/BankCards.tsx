import { FC } from 'react';
import BankCard from '@/features/Cards/BankCard';
import { IBankCard } from '@/shared/types/types';

interface Props {}

const test: IBankCard[] = [
  {
    id: '1',
    title: 'Test Card',
    cardNumber: '1234567812345678',
    expirationDate: '12/25',
    cvv: '123',
    nameOnCard: 'John Doe',
    notes: 'Test note',
    createdAt: Date.now()
  }
];

const BankCards: FC<Props> = ({}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {test.map((card) => (
        <BankCard key={card.id} {...card} onDelete={() => console.log('delete')} />
      ))}
    </div>
  );
};

export default BankCards;
