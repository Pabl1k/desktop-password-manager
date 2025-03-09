import { FC } from 'react';
import clsx from 'clsx';
import { WebsiteCard } from '../../types/types';
import CreateCard from '../createCard/CreateCard';
import styles from './Toolbar.module.scss';

interface Props {
  onNewCardCreate: (newCard: WebsiteCard) => Promise<void>;
}
const Toolbar: FC<Props> = ({ onNewCardCreate }) => {
  return (
    <div className={clsx(styles.toolbar, 'flex items-center p-6')}>
      <CreateCard onSave={onNewCardCreate} />
    </div>
  );
};

export default Toolbar;
