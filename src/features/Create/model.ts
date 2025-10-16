import { CollectionKey } from '@/shared/lib/db/dbConfig';
import { MainView as MainViewType } from '@/shared/types/view';

export const removeDBData = <T extends object>(data: T): Omit<T, 'id' | 'createdAt'> => {
  if ('id' in data && 'createdAt' in data) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, ...rest } = data;
    return rest;
  } else {
    return data;
  }
};

export const getStateKeyByView = (view: MainViewType): CollectionKey => {
  if (view === 'main-bank_cards') {
    return 'bankCards';
  }

  if (view === 'main-notes') {
    return 'notes';
  }

  return 'accounts';
};
