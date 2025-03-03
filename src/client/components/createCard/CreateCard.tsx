import Modal from '../modal/Modal';
import Input from '../input/Input';
import { useState } from 'react';
import Button from '../button/Button';

interface CardData {
  title?: string;
  website: string;
  login: string;
  password: string;
}

const initialCardData: CardData = {
  title: '',
  website: '',
  login: '',
  password: ''
};

const CreateCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newCardData, setNewCardData] = useState<CardData>(initialCardData);

  const handleChange = (key: keyof CardData, value: string) => {
    setNewCardData((prevData) => ({
      ...prevData,
      [key]: value
    }));
  };

  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4 flex flex-col gap-4">
          {Object.keys(initialCardData).map((fieldName) => {
            return (
              <div key={fieldName} className="flex flex-col">
                <span className="capitalize mb-1">{fieldName}</span>
                <Input
                  value={newCardData[fieldName as keyof CardData] ?? ''}
                  placeholder={`Enter ${fieldName}`}
                  onChange={(newValue) => handleChange(fieldName as keyof CardData, newValue)}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-end pr-4 mb-4">
          <Button type="add" onClick={() => console.log('add')}>
            Add
          </Button>
          <Button className="ml-3" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Button type="add" onClick={() => setModalOpen(true)}>
        Add
      </Button>
    </>
  );
};

export default CreateCard;
