import Sidebar from '../../components/sidebar/Sidebar';
import Toolbar from '../../components/toolbar/Toolbar';

const Main = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Toolbar />
    </div>
  );
};

export default Main;
