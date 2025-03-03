import clsx from 'clsx';
import styles from './Toolbar.module.scss';
import CreateCard from '../createCard/CreateCard';

const Toolbar = () => {
  return (
    <div className={clsx(styles.toolbar, 'flex items-center p-6')}>
      <CreateCard />
    </div>
  );
};

export default Toolbar;
