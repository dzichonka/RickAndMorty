import { useCardsStore } from '@/store/useCardsStore';
import { createPortal } from 'react-dom';
import { CiSaveDown2 } from 'react-icons/ci';
import { GiMagicBroom } from 'react-icons/gi';

export function SelectedItems() {
  const items = useCardsStore((state) => state.selectedItems);
  const reset = useCardsStore((state) => state.reset);

  if (items.length === 0) {
    return null;
  }

  const handleDownload = () => {
    const tableHeader = [
      'id',
      'name',
      'status',
      'species',
      'type',
      'gender',
      'origin',
      'location',
    ];
    const tableRows = items.map((item) => [
      item.id,
      item.name,
      item.status,
      item.species,
      item.type,
      item.gender,
      item.origin.name,
      item.location.name,
    ]);
    const csvContent = `${tableHeader.join(',')}\n${tableRows
      .map((row) => row.join(','))
      .join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${items.length}_rick_and_morty_cards.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return createPortal(
    <div className="w-full sticky bottom-0 bg-black/40 text-cyan-300 border-t border-white p-4 flex justify-between items-center z-50">
      <div>Number of selected cards: {items.length}</div>
      <div className="flex flex-row gap-4">
        <button className="btn-icon" onClick={reset}>
          <GiMagicBroom />
        </button>
        <button className="btn-icon" onClick={handleDownload}>
          <CiSaveDown2 />
        </button>
      </div>
    </div>,
    document.body
  );
}
