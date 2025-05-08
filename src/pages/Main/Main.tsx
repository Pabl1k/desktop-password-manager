import { FC } from 'react';
import Content from '@/pages/Content/Content';
import { WebsiteCard, WebsiteCardCreate } from '@/shared/types/types';
import { MainView } from '@/shared/types/view';
import Toolbar from '@/widgets/Toolbar';

interface Props {
  view: MainView;
  content: WebsiteCard[];
  onCreate: (card: WebsiteCardCreate) => Promise<void>;
  onDelete: (id: string) => void;
}

const Main: FC<Props> = ({ view, content, onCreate, onDelete }) => {
  if (view === 'mainAccounts') {
    return (
      <div>
        <span>Accounts: development in progress</span>
      </div>
    );
  }

  if (view === 'mainBankCards') {
    return (
      <div>
        <span>Bank Cards: development in progress</span>
      </div>
    );
  }

  if (view === 'mainNotes') {
    return (
      <div>
        <span>Notes: development in progress</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Toolbar onNewCardCreate={onCreate} />
      <Content cards={content} onNewCardCreate={onCreate} onDeleteCard={onDelete} />
    </div>
  );
};

export default Main;
