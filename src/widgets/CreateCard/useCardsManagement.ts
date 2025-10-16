import { useState } from 'react';
import { getStateKeyByView } from '@/features/Create/model';
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
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create'); // refactor to single state with modalOpen
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

  const handleEditStart = (id: string) => {
    const type = getStateKeyByView(view);
    const selectedData = state[type].find((item) => item.id === id);

    if (!selectedData) {
      return;
    }

    setModalMode('edit');
    setNewCardData(selectedData);
    setModalOpen(true);
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
    handleEditStart,
    handleDelete,
    handleSave,
    handleClose,
    handleOutsideClickClose
  };
};
