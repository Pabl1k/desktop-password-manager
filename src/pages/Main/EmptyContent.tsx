import { FC } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { MainView } from '@/shared/types/view';
import CreateCardModal from '@/widgets/CreateCard/CreateCardModal';
import { CreateCardReturn } from '@/widgets/CreateCard/useCardsManagement';

interface Props {
  view: MainView;
  createCard: CreateCardReturn;
}

const EmptyContent: FC<Props> = ({ view, createCard }) => {
  const { t } = useTranslations();

  const textMapper: Record<MainView, string> = {
    main: 'empty_overview_placeholder',
    'main-accounts': 'empty_accounts_placeholder',
    'main-bank_cards': 'empty_bankCards_placeholder',
    'main-notes': 'empty_notes_placeholder'
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[50vw] flex flex-col items-center mt-6 gap-4">
        <span className="text-2xl text-center">{t(textMapper[view])}</span>

        {view !== 'main' && <CreateCardModal view={view} createCard={createCard} />}
      </div>
    </div>
  );
};

export default EmptyContent;
