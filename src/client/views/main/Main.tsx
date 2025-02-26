import Sidebar from '../../components/sidebar/Sidebar';
import Toolbar from '../../components/toolbar/Toolbar';
import Content from '../../components/content/Content';

const Main = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Toolbar />
        <Content />
      </div>
    </div>
  );
};

export default Main;
