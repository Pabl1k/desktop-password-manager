import { FC } from 'react';
import { MainView } from '@/shared/types/view';
import CreateCardModal from '@/widgets/CreateCardModal';

interface Props {
  view: MainView;
  // onNewCardCreate: (newCard: AccountCreate) => Promise<void>;
}

const Toolbar: FC<Props> = ({ view }) => {
  return (
    <div className="h-[85px] bg-bg-toolbar border-b border-section-border flex items-center p-6">
      {view.startsWith('main-') && (
        <CreateCardModal view={view} onCreate={() => console.log('create')} />
      )}
    </div>
  );
};

export default Toolbar;
