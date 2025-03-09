import { FC } from 'react';
import clsx from 'clsx';
import { WebsiteCard } from '../../types/types';
import Card from '../card/Card';
import styles from './Content.module.scss';

interface Props {
  cards: WebsiteCard[];
  onDeleteCard: (id: string) => void;
}

const Content: FC<Props> = ({ cards, onDeleteCard }) => {
  return (
    <div className={clsx(styles.content, 'flex flex-wrap gap-4 p-6 overflow-auto')}>
      {cards.map((item) => (
        <Card
          key={item.id}
          login={item.login}
          link={item.url}
          title={item.sourceName}
          password={item.password}
          onDelete={() => onDeleteCard(item.id)}
        />
      ))}
    </div>
  );
};

export default Content;
