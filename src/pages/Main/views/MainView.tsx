import { type FC } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { MainView as MainViewType } from '@/shared/types/view';

type Props = {
  accountsCount: number;
  bankCardsCount: number;
  notesCount: number;
  goToView: (view: MainViewType) => void;
};

const MainView: FC<Props> = ({ accountsCount, bankCardsCount, notesCount, goToView }) => {
  const { t } = useTranslations();

  const renderBlock = (key: string, count: number) => (
    <div
      className="w-full h-[200px] bg-bg-card rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-grey-hover"
      onClick={() => goToView(`main-${key}` as MainViewType)}
    >
      <h2 className="text-lg font-semibold text-text-main">{t(key)}</h2>
      <p className="text-3xl font-bold text-green-main mt-2">{count}</p>
    </div>
  );

  return (
    <div className="flex gap-4 max-lg:flex-col">
      {renderBlock('accounts', accountsCount)}
      {renderBlock('bank_cards', bankCardsCount)}
      {renderBlock('notes', notesCount)}
    </div>
  );
};

export default MainView;
