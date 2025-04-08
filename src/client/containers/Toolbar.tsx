import { FC } from 'react';
import CreateCard from '../components/createCard/CreateCard';
import { WebsiteCardCreate } from '../types/types';

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
