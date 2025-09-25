import { useState } from 'react';
import { CollectionKey } from '@/shared/lib/db/dbConfig';
import { MainView } from '@/shared/types/view';
import {
  CardState,
  getCollectionNameByView,
  getInitialStateByView
} from '@/widgets/CreateCard/model';

const isDirty = (state: CardState | null) => {
  if (!state) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { safety, ...rest } = state;
  const stringState = rest as Record<string, string>;

  return Object.values(stringState).some((value) => Boolean(value));
};

export const useCreateCard = (
  view: MainView,
  onCardCreate: <T>(collection: CollectionKey, data: T) => Promise<void>
) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newCardData, setNewCardData] = useState<CardState | null>(null);

  const dirty = isDirty(newCardData);

  const addNewCard = () => {
    setNewCardData(getInitialStateByView(view));
    setModalOpen(true);
  };

  const handleFieldChange = (field: string, value: string | boolean) => {
    setNewCardData((prevData) => {
      if (!prevData) {
        return prevData;
      }

      return {
        ...prevData,
        [field]: value
      };
    });
  };

  const handleClose = () => {
    setModalOpen(false);
    setNewCardData(null);
  };

  const handleOutsideClickClose = () => {
    if (dirty) {
      return;
    }

    handleClose();
  };

  const handleSave = async () => {
    const collection = getCollectionNameByView(view);
    await onCardCreate(collection, newCardData); // trim before save
    handleClose();
  };

  return {
    modalOpen,
    newCardData,
    dirty,
    addNewCard,
    handleFieldChange,
    handleSave,
    handleClose,
    handleOutsideClickClose
  };
};
