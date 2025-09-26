import { MainView } from '@/shared/types/view';
import { Translation } from '@/shared/hooks/useTranslations';
import { AccountCreate, BankCardCreate, NoteCardCreate } from '@/shared/types/types';
import { CollectionKey } from '@/shared/lib/db/dbConfig';

export type CardState = AccountCreate | BankCardCreate | NoteCardCreate;

export const getModalTitle = (view: MainView, t: Translation) => {
  if (view === 'main-accounts') {
    return t('add_account');
  }
  if (view === 'main-bank_cards') {
    return t('add_bank_card');
  }
  if (view === 'main-notes') {
    return t('add_note');
  }
  return '';
};

export const getInitialStateByView = (view: MainView): CardState | null => {
  if (view === 'main-accounts') {
    return {
      title: '',
      login: '',
      password: '',
      url: '',
      notes: '',
      safety: false
    };
  }

  if (view === 'main-bank_cards') {
    return {
      title: '',
      cardNumber: '',
      cardholder: '',
      expirationDate: '',
      cvv: '',
      notes: '',
      safety: false
    };
  }

  if (view === 'main-notes') {
    return {
      title: '',
      note: '',
      safety: false
    };
  }

  return null;
};

export const getCollectionNameByView = (view: MainView): CollectionKey => {
  if (view === 'main-accounts') {
    return 'accounts';
  }

  if  (view === 'main-bank_cards') {
    return 'bankCards';
  }

  return 'notes';
};

