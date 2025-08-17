'use client';
import { useCardsStore } from '@/store/useCardsStore';
import { useState, useTransition } from 'react';
import { createPortal } from 'react-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import { DownloadLink } from '../DownloadLink/DownloadLink';
import { createCSV } from '@/app/actions';
import Loader from '../Loader/Loader';

export function SelectedItems() {
  const items = useCardsStore((state) => state.selectedItems);
  const reset = useCardsStore((state) => state.reset);
  const [downloadData, setDownloadData] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (items.length === 0) {
    return null;
  }

  const handleDownload = async () => {
    startTransition(async () => {
      const csvContent = await createCSV(items);
      setDownloadData(csvContent);
    });
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
            {isPending ? <Loader /> : <MdDownloadForOffline />}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
