import { FC } from 'react';
import AccountCard from '@/features/Cards/AccountCard';
import { CollectionKey } from '@/shared/lib/db/dbConfig';
import { AccountCardData } from '@/shared/types/types';
import EmptyContent from '../EmptyContent';

interface Props {
  accounts: AccountCardData[];
  onCardCreate: <T>(collection: CollectionKey, data: T) => Promise<void>;
  onDelete: (id: string) => void;
}

const Accounts: FC<Props> = ({ accounts, onCardCreate, onDelete }) => {
  if (!accounts.length) {
    return <EmptyContent view="main-accounts" onCardCreate={onCardCreate} />;
  }

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
