import { FC } from 'react';
import Accounts from '@/pages/Main/Accounts';
import { AccountCard, AccountCardCreate } from '@/shared/types/types';
import { MainView } from '@/shared/types/view';
import Toolbar from '@/widgets/Toolbar';

interface Props {
  view: MainView;
  content: AccountCard[];
  onCreate: (card: AccountCardCreate) => Promise<void>;
  onDelete: (id: string) => void;
}

const Main: FC<Props> = ({ view, content, onCreate, onDelete }) => {
  const renderContent = () => {
    if (view === 'main-accounts') {
      return <Accounts cards={content} onNewCardCreate={onCreate} onDeleteCard={onDelete} />;
    }

    if (view === 'main-bank_cards') {
      return (
        <div>
          <span>Bank Cards: development in progress</span>
        </div>
      );
    }

    if (view === 'main-notes') {
      return (
        <div>
          <span>Notes: development in progress</span>
        </div>
      );
    }

    return <div>Main page</div>;
  };

  return (
    <div className="w-full">
      <Toolbar onNewCardCreate={onCreate} />
      {renderContent()}
    </div>
  );
};

export default Main;
