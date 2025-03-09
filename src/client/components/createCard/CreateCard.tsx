import { FC, useState } from 'react';
import { WebsiteCard, WebsiteCardCreate } from '../../types/types';
import Button from '../button/Button';
import Input from '../input/Input';
import Modal from '../modal/Modal';

interface Props {
  onSave: (newCard: WebsiteCardCreate) => Promise<void>;
}

const titleMapper: Record<keyof WebsiteCardCreate, string> = {
  sourceName: 'Card title',
  login: 'Login',
  password: 'Password',
  url: 'Website url',
  notes: 'Note'
};

const initialCardData: WebsiteCardCreate = {
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
    setNewCardData(initialCardData);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setNewCardData(initialCardData);
  };

  return (
    <>
      <Modal open={modalOpen} onClose={handleCancel}>
        <div className="p-4 flex flex-col gap-4">
          {Object.keys(initialCardData).map((field) => {
            const fieldName = field as keyof WebsiteCardCreate;
            const fieldTitle = titleMapper[fieldName];

            return (
              <div key={fieldName} className="flex flex-col">
                <span className="capitalize mb-1">{fieldTitle}</span>
                <Input
                  value={newCardData[fieldName] ?? ''}
                  placeholder={`Enter ${fieldTitle.toLowerCase()}`}
                  onChange={(newValue) => handleChange(fieldName, newValue)}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-end pr-4 mb-4">
          <Button type="add" onClick={handleSave}>
            Save
          </Button>
          <Button className="ml-3" onClick={handleCancel}>
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
