import { FC } from 'react';
import clsx from 'clsx';
import CreateCard from '../../components/createCard/CreateCard';
import { WebsiteCardCreate } from '../../types/types';
import styles from './Toolbar.module.scss';

interface Props {
  onNewCardCreate: (newCard: WebsiteCardCreate) => Promise<void>;
}
const Toolbar: FC<Props> = ({ onNewCardCreate }) => {
  return (
    <div className={clsx(styles.toolbar, 'flex items-center p-6')}>
      <CreateCard onSave={onNewCardCreate} />
    </div>
  );
};

export default Toolbar;
