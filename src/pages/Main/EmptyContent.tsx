import { FC } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { CollectionKey } from '@/shared/lib/db/dbConfig';
import { MainView } from '@/shared/types/view';
import CreateCardModal from '@/widgets/CreateCard/CreateCardModal';

interface Props {
  view: MainView;
  onCardCreate: <T>(collection: CollectionKey, data: T) => Promise<void>;
}

const EmptyContent: FC<Props> = ({ view, onCardCreate }) => {
  const { t } = useTranslations();

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[50vw] flex flex-col items-center mt-6 gap-4">
        <span className="text-2xl text-center">{t('empty_content_placeholder')}</span>

        <CreateCardModal view={view} onCardCreate={onCardCreate} />
      </div>
    </div>
  );
};

export default EmptyContent;
