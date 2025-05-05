import { FC } from 'react';
import { useTranslations } from '../../shared/hooks/useTranslations';
import { WebsiteCardCreate } from '../../shared/types/types';
import CreateCard from '../../widgets/CreateCard';

interface Props {
  onNewCardCreate: (newCard: WebsiteCardCreate) => Promise<void>;
}

const EmptyContent: FC<Props> = ({ onNewCardCreate }) => {
  const { t } = useTranslations();

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[50vw] flex flex-col items-center mt-6 gap-4">
        <span className="text-2xl">{t('empty_content_placeholder')}</span>
        <CreateCard onSave={onNewCardCreate} />
      </div>
    </div>
  );
};

export default EmptyContent;
