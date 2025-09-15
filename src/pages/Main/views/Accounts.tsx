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
      {accounts.map((item) => (
        <AccountCard
          key={item.id}
          login={item.login}
          link={item.url}
          title={item.title}
          password={item.password}
          notes={item.notes}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
};

export default Accounts;
