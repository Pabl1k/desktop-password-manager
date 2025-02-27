import Card from '../card/Card';
import clsx from 'clsx';
import styles from './Content.module.scss';

const items = [
  { id: '1', title: 'Google', link: 'https://google.com', login: 'user1', password: 'pass123' }
];

const Content = () => {
  return (
    <div className={clsx(styles.content, 'flex flex-wrap gap-4 p-6 overflow-auto')}>
      {items.map((item) => (
        <Card
          key={item.id}
          login={item.login}
          link={item.link}
          title={item.title}
          password={item.password}
        />
      ))}
    </div>
  );
};

export default Content;
