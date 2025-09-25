import { FC } from 'react';
import AccountCard from '@/features/Cards/AccountCard';
import { AccountCardData } from '@/shared/types/types';

interface Props {
  accounts: AccountCardData[];
  onDelete: (id: string) => void;
}

const Accounts: FC<Props> = ({ accounts, onDelete }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {accounts.map((data) => (
        <AccountCard key={data.id} {...data} onDelete={() => onDelete(data.id)} />
      ))}
    </div>
  );
};

export default Accounts;
