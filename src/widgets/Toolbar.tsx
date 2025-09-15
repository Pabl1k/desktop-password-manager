import { FC } from 'react';
import { MainView } from '@/shared/types/view';
import CreateCardModal from '@/widgets/CreateCard/CreateCardModal';
import { CollectionKey } from '@/shared/lib/db/dbConfig';

interface Props {
  view: MainView;
  onCardCreate: <T>(collection: CollectionKey, data: T) => Promise<void>;
}

const Toolbar: FC<Props> = ({ view, onCardCreate }) => {
  return (
    <div className="h-[85px] bg-bg-toolbar border-b border-section-border flex items-center p-6">
      {view.startsWith('main-') && <CreateCardModal view={view} onCardCreate={onCardCreate} />}
    </div>
  );
};

export default Toolbar;
