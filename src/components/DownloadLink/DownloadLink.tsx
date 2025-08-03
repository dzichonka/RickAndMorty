import { useEffect, useRef } from 'react';

type DownloadLinkProps = {
  data: string;
  filename: string;
  onDownloaded?: () => void;
};

export function DownloadLink({
  data,
  filename,
  onDownloaded,
}: DownloadLinkProps) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const clickedRef = useRef(false);

  useEffect(() => {
    if (clickedRef.current) return;
    clickedRef.current = true;
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = linkRef.current;
    if (link) {
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }
    if (onDownloaded) onDownloaded();
  }, [data, filename, onDownloaded]);

  return (
    <a ref={linkRef} className="display-none">
      Download Link
    </a>
  );
}
