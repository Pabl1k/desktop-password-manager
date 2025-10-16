import { FC } from 'react';
import { MainView } from '@/shared/types/view';
import CreateCardModal from '@/widgets/CreateCard/CreateCardModal';
import { CreateCardReturn } from '@/widgets/CreateCard/useCardsManagement';

interface Props {
  view: MainView;
  createCard: CreateCardReturn;
}

const Toolbar: FC<Props> = ({ view, createCard }) => {
  return (
    <div className="h-[85px] bg-bg-toolbar border-b border-section-border flex items-center p-6">
      {view.startsWith('main-') && <CreateCardModal view={view} createCard={createCard} />}
    </div>
  );
};

export default Toolbar;
