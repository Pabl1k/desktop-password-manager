import { RefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  callback?: () => void
) => {
  const handleClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callback?.();
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);
};
