import { useState } from 'react';
import { useDatabase } from '../db/useDatabase';
import Login from '../pages/Login/Login';
import Settings from '../pages/Settings/Settings';
import { useAuth } from '../shared/hooks/useAuth';
import { WebsiteCard } from '../shared/types/types';
import { ContentView } from '../shared/types/view';
import Content from '../widgets/Content';
import Sidebar from '../widgets/Sidebar';
import Toolbar from '../widgets/Toolbar';

const App = () => {
  const { state: cards, add, remove } = useDatabase<WebsiteCard>();
  const [view, setView] = useState<ContentView>('main');
  const { loginRequired, handleLogin } = useAuth();

  const displayContentByView = () => {
    if (view === 'recentlyDeleted') {
      return (
        <div className="h-screen">
          <span>Recently Deleted: development in progress</span>
        </div>
      );
    }

    if (view === 'settings') {
      return <Settings />;
    }

    return (
      <div className="w-full">
        <Toolbar onNewCardCreate={add} />
        <Content cards={cards} onNewCardCreate={add} onDeleteCard={remove} />
      </div>
    );
  };

  return (
    <div className="bg-bg-main text-text-main overflow-hidden flex min-h-screen">
      {loginRequired ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Sidebar setView={setView} />
          {displayContentByView()}
        </>
      )}
    </div>
  );
};

export default App;
