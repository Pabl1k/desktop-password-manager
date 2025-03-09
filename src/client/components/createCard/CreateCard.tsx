import { FC, useState } from 'react';
import { WebsiteCard } from '../../types/types';
import Button from '../button/Button';
import Input from '../input/Input';
import Modal from '../modal/Modal';

interface Props {
  onSave: (newCard: WebsiteCard) => Promise<void>;
}

const initialCardData: WebsiteCard = {
  id: '',
  sourceName: '',
  login: '',
  password: '',
  url: '',
  notes: ''
};

const CreateCard: FC<Props> = ({ onSave }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newCardData, setNewCardData] = useState(initialCardData);

  const handleChange = (key: keyof WebsiteCard, value: string) => {
    setNewCardData((prevData) => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleSave = async () => {
    await onSave(newCardData);
    setModalOpen(false);
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
                  value={newCardData[fieldName as keyof WebsiteCard] ?? ''}
                  placeholder={`Enter ${fieldName}`}
                  onChange={(newValue) => handleChange(fieldName as keyof WebsiteCard, newValue)}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-end pr-4 mb-4">
          <Button type="add" onClick={handleSave}>
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
