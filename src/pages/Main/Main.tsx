import { FC } from 'react';
import Accounts from '@/pages/Main/views/Accounts';
import BankCards from '@/pages/Main/views/BankCards';
import Notes from '@/pages/Main/views/Notes';
import { useDatabase } from '@/shared/lib/db/useDatabase';
import { MainView } from '@/shared/types/view';
import Toolbar from '@/widgets/Toolbar';

interface Props {
  view: MainView;
}

const Main: FC<Props> = ({ view }) => {
  const { state, add, remove } = useDatabase();

  const renderContent = () => {
    if (view === 'main-accounts') {
      return (
        <Accounts
          accounts={state.accounts}
          onCardCreate={add}
          onDelete={(id) => remove('accounts', id)}
        />
      );
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
      <Toolbar view={view} onCardCreate={add} />
      <div className="h-[calc(100vh-85px)] p-6 overflow-auto custom-scroll">{renderContent()}</div>
    </div>
  );
};

export default Main;
