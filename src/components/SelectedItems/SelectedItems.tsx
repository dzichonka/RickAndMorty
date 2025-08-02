import { useCardsStore } from '@/store/useCardsStore';
import { createPortal } from 'react-dom';

export function SelectedItems() {
  const count = useCardsStore((state) => state.selectedIds.length);
  if (count === 0) return null;
  return createPortal(
    <div className="w-full sticky bottom-0 bg-white/50 border-t p-4 shadow-md flex justify-between items-center z-50">
      <div>count: {count}</div>
    </div>,
    document.body
  );
}
