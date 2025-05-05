import { FC, useState } from 'react';
import { useTranslations } from '../shared/hooks/useTranslations';
import { copyToClipboard, generatePassword } from '../shared/lib/utils/utils';
import Button from '../shared/ui/Button';
import Modal from '../shared/ui/Modal';

interface ApplyButton {
  textKey: string;
  onClick: (password: string) => void;
}

interface Props {
  open: boolean;
  applyButton?: ApplyButton;
  onClose: () => void;
}

const PasswordGeneratorModal: FC<Props> = ({ open, applyButton, onClose }) => {
  const { t } = useTranslations();

  const [value, setValue] = useState(generatePassword());
  const [copied, setCopied] = useState(false); // ref ???

  const getApplyButtonText = () => {
    if (applyButton) {
      return t(applyButton.textKey);
    }

    return t(copied ? 'copied_to_clipboard' : 'copy_to_clipboard');
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
      <span className="text-2xl flex justify-center">{t('generate_password')}</span>
      <div>
        <div className="border border-section-border rounded-field truncate pl-3 py-2 text-3xl">
          {value}
        </div>
        <div className="flex justify-center mt-2">
          <Button onClick={handleRegenerate}>{t('regenerate')}</Button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="add" disabled={copied} onClick={handleApplyButtonClick}>
          {getApplyButtonText()}
        </Button>
        <Button className="ml-2" onClick={handleClose}>
          {t('cancel')}
        </Button>
      </div>
    </Modal>
  );
};

export default PasswordGeneratorModal;
