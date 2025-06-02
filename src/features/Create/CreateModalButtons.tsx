import { FC } from 'react';
import { useTranslations } from '@/shared/hooks/useTranslations';
import Button from '@/shared/ui/Button';

interface Props {
  saveDisabled: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const CreateModalButtons: FC<Props> = ({ saveDisabled, onSave, onCancel }) => {
  const { t } = useTranslations();

  return (
    <div className="flex justify-end pr-4 mb-4">
      <Button type="add" disabled={saveDisabled} onClick={onSave}>
        {t('save')}
      </Button>
      <Button className="ml-3" onClick={onCancel}>
        {t('cancel')}
      </Button>
    </div>
  );
};

export default CreateModalButtons;
