import { FC } from 'react';
import { WebsiteCardCreate } from '../shared/types/types';
import CreateCard from './CreateCard';

interface Props {
  onNewCardCreate: (newCard: WebsiteCardCreate) => Promise<void>;
}

const Toolbar: FC<Props> = ({ onNewCardCreate }) => {
  return (
    <div className="h-[85px] bg-bg-toolbar border-b border-section-border flex items-center p-6">
      <CreateCard onSave={onNewCardCreate} />
    </div>
  );
};

export default Toolbar;
