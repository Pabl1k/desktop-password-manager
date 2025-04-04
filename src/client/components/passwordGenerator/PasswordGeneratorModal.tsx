import { FC, useState } from 'react';
import clsx from 'clsx';
import Button from '../../common/components/button/Button';
import Modal from '../../common/components/modal/Modal';
import { copyToClipboard, generatePassword } from '../../common/utils';
import styles from './PasswordGeneratorModal.module.scss';

interface ApplyButton {
  text: string;
  onClick: (password: string) => void;
}

interface Props {
  open: boolean;
  applyButton?: ApplyButton;
  onClose: () => void;
}

const PasswordGeneratorModal: FC<Props> = ({ open, applyButton, onClose }) => {
  const [value, setValue] = useState(generatePassword());
  const [copied, setCopied] = useState(false);

  const getApplyButtonText = () => {
    if (applyButton) {
      return applyButton.text;
    }

    return copied ? 'Copied to clipboard' : 'Copy to clipboard';
  };

  const handleRegenerate = () => {
    setValue(generatePassword());
    setCopied(false);
  };

  const handleApplyButtonClick = async () => {
    if (applyButton) {
      applyButton.onClick(value);
      setValue(generatePassword());
      return;
    }

    await copyToClipboard(value);
    setCopied(true);
  };

  const handleClose = () => {
    setCopied(false);
    onClose();
  };

  return (
    <Modal open={open} className="p-6 flex flex-col justify-between h-[300px] max-w-[400px]">
      <span className="text-2xl flex justify-center">Generate password</span>
      <div>
        <div className={clsx(styles.passwordField, 'pl-2 py-2 text-3xl')}>{value}</div>
        <div className="flex justify-center mt-2">
          <Button onClick={handleRegenerate}>Regenerate</Button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="add" disabled={copied} onClick={handleApplyButtonClick}>
          {getApplyButtonText()}
        </Button>
        <Button className="ml-2" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default PasswordGeneratorModal;
