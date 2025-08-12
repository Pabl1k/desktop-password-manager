import { FC } from 'react';
import Accounts from '@/pages/Main/views/Accounts';
import BankCards from '@/pages/Main/views/BankCards';
import Notes from '@/pages/Main/views/Notes';
import { AccountCardData, AccountCreate } from '@/shared/types/types';
import { MainView } from '@/shared/types/view';
import Toolbar from '@/widgets/Toolbar';

interface Props {
  view: MainView;
  content: AccountCardData[];
  onCreate: (card: AccountCreate) => Promise<void>;
  onDelete: (id: string) => void;
}

const Main: FC<Props> = ({ view, content, onCreate, onDelete }) => {
  const renderContent = () => {
    if (view === 'main-accounts') {
      return <Accounts accounts={content} onNewAccountCreate={onCreate} onDelete={onDelete} />;
    }

    if (view === 'main-bank_cards') {
      return <BankCards />;
    }

    if (view === 'main-notes') {
      return <Notes />;
    }

    return <div>Main page</div>;
  };

  return (
    <div className="w-full">
      <Toolbar view={view} />
      <div className="h-[calc(100vh-85px)] p-6 overflow-auto custom-scroll">{renderContent()}</div>
    </div>
  );
};

export default Main;
