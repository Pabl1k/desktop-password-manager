import { useDatabase } from '../../db/useDatabase';
import { WebsiteCard } from '../../types/types';
import Content from '../content/Content';
import Sidebar from '../sidebar/Sidebar';
import Toolbar from '../toolbar/Toolbar';

const Main = () => {
  const { state, add, remove } = useDatabase<WebsiteCard>();

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Toolbar onNewCardCreate={add} />
        <Content cards={state} onDeleteCard={remove} />
      </div>
    </div>
  );
};

export default Main;
