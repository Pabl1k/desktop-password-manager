import { FC, useState } from 'react';
import Button from '../../common/components/button/Button';
import PasswordGeneratorModal from '../../components/passwordGenerator/PasswordGeneratorModal';
import { ContentView } from '../../types/view';
import styles from './Sidebar.module.scss';

interface Props {
  setView: (view: ContentView) => void;
}

interface SidebarAction {
  title: string;
  onClick: () => void;
}

const Sidebar: FC<Props> = ({ setView }) => {
  const [passwordGeneratorModalOpen, setPasswordGeneratorModalOpen] = useState(false);

  const actions: SidebarAction[] = [
    {
      title: 'Main',
      onClick: () => setView('main')
    },
    {
      title: 'Password generator',
      onClick: () => setPasswordGeneratorModalOpen(true)
    },
    {
      title: 'Recently deleted',
      onClick: () => setView('recentlyDeleted')
    },
    {
      title: 'Settings',
      onClick: () => setView('settings')
    }
  ];

  return (
    <div className={styles.sidebar}>
      <PasswordGeneratorModal
        open={passwordGeneratorModalOpen}
        onClose={() => setPasswordGeneratorModalOpen(false)}
      />
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
