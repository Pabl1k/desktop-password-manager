import clsx from 'clsx';
import CreateCard from '../createCard/CreateCard';
import styles from './Toolbar.module.scss';

const Toolbar = () => {
  return (
    <div className={clsx(styles.toolbar, 'flex items-center p-6')}>
      <CreateCard />
    </div>
  );
};

export default Toolbar;
