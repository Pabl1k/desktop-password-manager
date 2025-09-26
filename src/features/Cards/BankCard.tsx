import { FC, memo, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { uniqueId } from '@/shared/lib/utils/generate';
import { copyToClipboard } from '@/shared/lib/utils/link';
import { BankCardData } from '@/shared/types/types';
import CardNotes from '@/shared/ui/CardNotes';
import DropdownMenu, { DropdownOption } from '@/shared/ui/DropdownMenu';
import Icon from '@/shared/ui/Icon';
import IconButton from '@/shared/ui/IconButton';

interface Props extends BankCardData {
  onDelete: () => void;
}

interface Block {
  value: string;
  blockTitleKey?: string;
  className?: string;
  copyValue?: string;
}

const getHiddenData = (length: number) =>
  Array.from({ length }).map(() => (
    <span key={uniqueId()} className="text-2xl">
      &#x2022;
    </span>
  ));

const BankCard: FC<Props> = ({
  title,
  cardNumber,
  expirationDate,
  cvv,
  cardholder,
  notes,
  onDelete
}) => {
  const { t } = useTranslations();

  const [showData, setShowData] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

  const menuOptions: DropdownOption[] = [
    {
      labelKey: 'open_notes',
      visible: Boolean(notes),
      onClick: () => setShowNotes(true)
    },
    {
      labelKey: 'delete',
      visible: true,
      onClick: onDelete
    }
  ];

  const renderDataBlock = ({ value, blockTitleKey, className, copyValue }: Block) => (
    <div className={clsx(className, 'flex flex-col')}>
      {blockTitleKey && <span className="text-base text-green-main">{t(blockTitleKey)}</span>}
      <div className="h-[32px] flex items-center">
        <span className="text-xl">{showData ? value : getHiddenData(value.toString().length)}</span>
        {showData && (
          <IconButton
            className="ml-3"
            iconName="copy"
            onClick={() => copyToClipboard(copyValue ?? value)}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="w-[330px] bg-bg-card rounded-modal flex flex-col">
      <div className="flex items-center justify-between py-2 px-4 border-b border-border">
        <span className="text-2xl truncate" title={title}>
          {title}
        </span>
        <div className="flex items-center">
          <IconButton
            iconName={showData ? 'show' : 'hide'}
            onClick={() => setShowData(!showData)}
          />
          <DropdownMenu options={menuOptions}>
            <Icon name="dotMenu" />
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col py-2">
        {showNotes ? (
          <CardNotes text={notes} onClose={() => setShowNotes(false)} />
        ) : (
          <div className="px-4">
            {renderDataBlock({
              value: formattedCardNumber,
              copyValue: cardNumber
            })}
            <div className="flex">
              {renderDataBlock({
                blockTitleKey: 'expires',
                value: expirationDate
              })}
              {renderDataBlock({
                className: 'ml-4',
                blockTitleKey: 'cvv',
                value: cvv
              })}
            </div>
            {renderDataBlock({
              blockTitleKey: 'card_holder',
              value: cardholder
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(BankCard, () => true);
