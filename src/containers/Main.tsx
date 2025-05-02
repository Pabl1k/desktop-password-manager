import { useState } from 'react';
import { useDatabase } from '../db/useDatabase';
import { WebsiteCard } from '../types/types';
import { ContentView } from '../types/view';
import Content from './Content';
import Settings from './Settings.js';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

const Main = () => {
  const { state: cards, add, remove } = useDatabase<WebsiteCard>();
  const [view, setView] = useState<ContentView>('main');

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
    <div className="flex min-h-screen">
      <Sidebar setView={setView} />
      {displayContentByView()}
    </div>
  );
};

export default Main;
