import { FC } from 'react';
import IconButton from '@/shared/ui/IconButton';

interface Props {
  text: string;
  onClose: () => void;
}

const CardNotes: FC<Props> = ({ text, onClose }) => {
  return (
    <div className="relative">
      <IconButton iconName="close" className="absolute top-1 right-1" size={15} onClick={onClose} />
      <div className="mt-6 px-2 max-h-[170px] overflow-auto">
        <span className="text-sm">{text}</span>
      </div>
    </div>
  );
};

export default CardNotes;
