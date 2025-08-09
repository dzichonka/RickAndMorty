import { useCardsStore } from '@/store/useCardsStore';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import { DownloadLink } from '../DownloadLink/DownloadLink';

export function SelectedItems() {
  const items = useCardsStore((state) => state.selectedItems);
  const reset = useCardsStore((state) => state.reset);
  const [downloadData, setDownloadData] = useState<string | null>(null);

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
    setDownloadData(csvContent);
  };
  return createPortal(
    <div className="w-full sticky bottom-0 bg-black/60 text-cyan-300 border-t border-white z-50">
      <div className="container p-4 flex flex-row justify-between items-center ">
        {' '}
        {downloadData && (
          <DownloadLink
            data={downloadData}
            filename={`rick_and_morty_${items.length}_cards.csv`}
            onDownloaded={() => setDownloadData(null)}
          />
        )}
        <div>Number of selected cards: {items.length}</div>
        <div className="flex flex-row gap-4">
          <button className="btn-icon text-[2rem]" onClick={reset}>
            <MdDeleteForever />
          </button>
          <button className="btn-icon text-[2rem]" onClick={handleDownload}>
            <MdDownloadForOffline />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
