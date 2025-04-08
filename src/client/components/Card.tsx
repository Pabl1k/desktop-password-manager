import { FC, useState } from 'react';
import Button from '../common/components/Button';
import { copyToClipboard, getLinkHostname } from '../common/utils';

interface Props {
  title: string;
  link: string;
  login: string;
  password: string;
  onDelete?: () => void;
}

const hiddenPassword = Array.from({ length: 16 }).map((_, i) => (
  <span key={i.toString()}>&#x2022;</span>
));

const Card: FC<Props> = ({ title, link, login, password, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  const displayPasswordFieldValue = showPassword ? password : hiddenPassword;

  return (
    <div className="w-[280px] h-[320px] bg-bg-card rounded-modal flex flex-col justify-between">
      <div className="flex flex-col p-4 border-b border-border">
        <span className="text-2xl truncate">{title}</span>
        <span className="text-sm truncate text-green-primary" title={link}>
          {getLinkHostname(link)}
        </span>
      </div>

      <button onClick={onDelete}>delete</button>

      <div className="flex flex-col mx-4 rounded-field text-lg bg-bg-main border border-border">
        <span className="p-2">{login}</span>
        <div className="h-px bg-border" />
        <div className="flex justify-between p-2">
          <span>{displayPasswordFieldValue}</span>
          <button onClick={() => setShowPassword(!showPassword)}>Show</button>
        </div>
      </div>

      <div className="w-full flex justify-center" title={link}>
        <Button className="mb-4" onClick={() => copyToClipboard(link)}>
          Copy link
        </Button>
      </div>
    </div>
  );
};

export default Card;
