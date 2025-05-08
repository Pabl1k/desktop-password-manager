import { FC } from 'react';
import AccountCard from '@/features/AccountCard/AccountCard';
import { IAccountCard, IAccountCardCreate } from '@/shared/types/types';
import EmptyContent from '../EmptyContent';

interface Props {
  accounts: IAccountCard[];
  onNewAccountCreate: (newCard: IAccountCardCreate) => Promise<void>;
  onDelete: (id: string) => void;
}

const Accounts: FC<Props> = ({ accounts, onNewAccountCreate, onDelete }) => {
  if (!accounts.length) {
    return <EmptyContent onNewCardCreate={onNewAccountCreate} />;
  }

  return (
    <div className=" flex flex-wrap gap-4">
      {accounts.map((item) => (
        <AccountCard
          key={item.id}
          login={item.login}
          link={item.url}
          title={item.sourceName}
          password={item.password}
          notes={item.notes}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
};

export default Accounts;
