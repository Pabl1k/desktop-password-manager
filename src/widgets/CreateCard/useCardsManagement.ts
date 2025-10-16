import { useState } from 'react';
import { useDatabase } from '@/shared/lib/db/useDatabase';
import { MainView } from '@/shared/types/view';
import {
  CardState,
  getCollectionNameByView,
  getInitialStateByView
} from '@/widgets/CreateCard/model';

export type CreateCardReturn = ReturnType<typeof useCardsManagement>;

const isDirty = (state: CardState | null) => {
  if (!state) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { safety, ...rest } = state;
  const stringState = rest as Record<string, string>;

  return Object.values(stringState).some((value) => Boolean(value));
};

const trimCardData = (data: CardState) => {
  const { safety, ...dataForTrim } = data;

  const trimmedState = Object.entries(dataForTrim).reduce<Record<string, string>>(
    (res, [key, value]) => {
      res[key] = (value as string).trim();
      return res;
    },
    {}
  );

  return { ...trimmedState, safety };
};

export const useCardsManagement = (view: MainView) => {
  const { state, add, remove } = useDatabase();

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

  const handleDelete = async (id: string) => {
    const collection = getCollectionNameByView(view);
    await remove(collection, id);
  };

  const handleSave = async () => {
    const trimmedData = trimCardData(newCardData!);
    const collection = getCollectionNameByView(view);

    await add(collection, trimmedData);
    handleClose();
  };

  return {
    state,
    modalOpen,
    newCardData,
    dirty,
    addNewCard,
    handleFieldChange,
    handleDelete,
    handleSave,
    handleClose,
    handleOutsideClickClose
  };
};
