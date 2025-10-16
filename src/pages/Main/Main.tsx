import { FC } from 'react';
import { getStateKeyByView } from '@/features/Create/model';
import EmptyContent from '@/pages/Main/EmptyContent';
import Accounts from '@/pages/Main/views/Accounts';
import BankCards from '@/pages/Main/views/BankCards';
import Notes from '@/pages/Main/views/Notes';
import { StateType } from '@/shared/lib/db/useDatabase';
import { MainView as MainViewType } from '@/shared/types/view';
import { useCardsManagement } from '@/widgets/CreateCard/useCardsManagement';
import Toolbar from '@/widgets/Toolbar';
import MainView from './views/MainView';

interface Props {
  view: MainViewType;
  setView: (view: MainViewType) => void;
}

const isViewStateEmpty = (state: StateType, view: MainViewType) => {
  if (view === 'main') {
    return Object.values(state).every((items) => !items.length);
  }

  const stateKeyByView = getStateKeyByView(view);
  return state[stateKeyByView].length === 0;
};

const Main: FC<Props> = ({ view, setView }) => {
  const cardsManagement = useCardsManagement(view);
  const { state, handleEditStart, handleDelete } = cardsManagement;

  const renderContent = () => {
    if (isViewStateEmpty(state, view)) {
      return <EmptyContent view={view} createCard={cardsManagement} />;
    }

    if (view === 'main-accounts') {
      return (
        <Accounts accounts={state.accounts} onEdit={handleEditStart} onDelete={handleDelete} />
      );
    }

    if (view === 'main-bank_cards') {
      return <BankCards cards={state.bankCards} onEdit={handleEditStart} onDelete={handleDelete} />;
    }

    if (view === 'main-notes') {
      return <Notes card={state.notes} onEdit={handleEditStart} onDelete={handleDelete} />;
    }

    return (
      <MainView
        accountsCount={state['accounts'].length}
        bankCardsCount={state['bankCards'].length}
        notesCount={state['notes'].length}
        goToView={setView}
      />
    );
  };

  return (
    <div className="w-full">
      <Toolbar view={view} createCard={cardsManagement} />
      <div className="h-[calc(100vh-85px)] p-6 overflow-auto custom-scroll">{renderContent()}</div>
    </div>
  );
};

export default Main;
