import Button from '../../common/components/button/Button';
import styles from './Sidebar.module.scss';

interface SidebarAction {
  title: string;
  onClick: () => void;
}

const Sidebar = () => {
  const actions: SidebarAction[] = [
    {
      title: 'Main',
      onClick: () => console.log('main')
    },
    {
      title: 'Password gerenarator',
      onClick: () => console.log('Password gerenarator')
    },
    {
      title: 'Recently deleted',
      onClick: () => console.log('Recently deleted')
    },
    {
      title: 'Settings',
      onClick: () => console.log('Settings')
    }
  ];

  return (
    <div className={styles.sidebar}>
      <div className="flex flex-col gap-2">
        {actions.map((action) => (
          <Button
            key={action.title}
            type="transparent"
            className="font-semibold text-start"
            onClick={action.onClick}
          >
            {action.title}
          </Button>
        ))}
      </div>
      <div>
        <Button className="w-full" type="add" onClick={() => console.log('update')}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
