import Content from '../../components/content/Content';
import Sidebar from '../../components/sidebar/Sidebar';
import Toolbar from '../../components/toolbar/Toolbar';
import { useDatabase } from '../../db/useDatabase';
import { WebsiteCard } from '../../types/types';

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
