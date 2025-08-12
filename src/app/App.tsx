import { useState } from 'react';
import Login from '@/pages/Login/Login';
import Main from '@/pages/Main/Main';
import Settings from '@/pages/Settings/Settings';
import { useAuth } from '@/shared/hooks/useAuth';
import { useDatabase } from '@/shared/lib/db/useDatabase';
import { ContentView } from '@/shared/types/view';
import Sidebar from '@/widgets/Sidebar';

const App = () => {
  const { state, add, remove } = useDatabase();
  const [view, setView] = useState<ContentView>('main');
  const { loginRequired, handleLogin } = useAuth();

  const displayContentByView = () => {
    if (view === 'recently-deleted') {
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
      <Main view={view} content={[]} onCreate={() => console.log('')} onDelete={() => 'dsa'} />
    );
  };

  return (
    <div className="bg-bg-main text-text-main overflow-hidden flex min-h-screen">
      {loginRequired ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Sidebar selectedView={view} setView={setView} />
          {displayContentByView()}
        </>
      )}
    </div>
  );
};

export default App;
