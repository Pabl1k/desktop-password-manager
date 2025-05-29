import { FC } from 'react';
import IconButton from '@/shared/ui/IconButton';

interface Props {
  text: string;
  onClose: () => void;
}

const CardNotes: FC<Props> = ({ text, onClose }) => {
  return (
    <div className="flex flex-col mx-4">
      <div className="px-4 min-h-[100px] max-h-[150px] overflow-auto custom-scroll rounded-field text-lg bg-bg-main border border-border">
        <span className="text-sm">{text}</span>
      </div>

      <div className="w-full flex justify-center mt-2">
        <IconButton iconName="close" onClick={onClose} />
      </div>
    </div>
  );
};

export default CardNotes;
