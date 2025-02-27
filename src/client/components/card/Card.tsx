import clsx from 'clsx';
import styles from './Card.module.scss';
import { FC, useState } from 'react';

interface Props {
  title: string;
  link: string;
  login: string;
  password: string;
}

const hiddenPassword = Array.from({ length: 16 }).map((_, i) => (
  <span key={i.toString()}>&#x2022;</span>
));

const Card: FC<Props> = ({ title, link, login, password }) => {
  const [showPassword, setShowPassword] = useState(false);

  const displayPasswordFieldValue = showPassword ? password : hiddenPassword;

  return (
    <div className={styles.card}>
      <div className={clsx(styles.cardHeader, 'flex flex-col p-4')}>
        <span className="text-2xl truncate">{title}</span>
        <span className={clsx(styles.cardSite, 'text-sm truncate')}>{link}</span>
      </div>
      <div className={clsx(styles.cardCredentials, 'flex flex-col mx-4 rounded-lg text-lg')}>
        <span className="p-2">{login}</span>
        <div className={styles.cardDivider} />
        <div className="flex justify-between p-2">
          <span>{displayPasswordFieldValue}</span>
          <button onClick={() => setShowPassword(!showPassword)}>Show</button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button className={clsx(styles.cardButton, 'mb-4 rounded-lg cursor-pointer')}>
          Open in browser
        </button>
      </div>
    </div>
  );
};

export default Card;
