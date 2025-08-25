import { FC } from 'react';
import EmptyContent from '@/pages/Main/EmptyContent';
import Accounts from '@/pages/Main/views/Accounts';
import BankCards from '@/pages/Main/views/BankCards';
import Notes from '@/pages/Main/views/Notes';
import { StateType, useDatabase } from '@/shared/lib/db/useDatabase';
import { MainView } from '@/shared/types/view';
import Toolbar from '@/widgets/Toolbar';

interface Props {
  view: MainView;
}

const getStateKeyByView = (view: MainView): keyof StateType => {
  if (view === 'main-bank_cards') {
    return 'bankCards';
  }

  if (view === 'main-notes') {
    return 'notes';
  }

  return 'accounts';
};

const isViewStateEmpty = (state: StateType, view: MainView) => {
  const stateKeyByView = getStateKeyByView(view);
  return state[stateKeyByView].length === 0;
};

const Main: FC<Props> = ({ view }) => {
  const { state, add, remove } = useDatabase();

  const renderContent = () => {
    if (isViewStateEmpty(state, view)) {
      return <EmptyContent view={view} onCardCreate={add} />;
    }

    if (view === 'main-accounts') {
      return <Accounts accounts={state.accounts} onDelete={(id) => remove('accounts', id)} />;
    }

    if (view === 'main-bank_cards') {
      return <BankCards cards={state.bankCards} />;
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
