'use client';
import type { IInfo } from '@/types/api-types';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

type PaginationProps = {
  info: IInfo;
};
export const Pagination = ({ info }: PaginationProps): React.JSX.Element => {
  const { next, prev, pages } = info;
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams?.get('page')) || 1;

  const handleChangePage = (url: string | null) => {
    if (!url) return;
    const page = new URL(url).searchParams.get('page');
    if (page) {
      const newParams = new URLSearchParams(searchParams?.toString() || '');
      newParams.set('page', page);
      router.push(`?${newParams.toString()}`);
    }
  };

  return (
    <div
      className="flex items-center justify-center gap-4 bg-[var(--bg-color)]/50 shadow-[0_0_16px_15px_var(--bg-color)]/50 rounded w-fit text-center"
      data-testid="pagination"
    >
      <button
        onClick={() => handleChangePage(prev)}
        disabled={!prev}
        className="btn-icon text-[1.5rem] "
        aria-label="Previous page"
      >
        <FaRegArrowAltCircleLeft />
      </button>

      <span className="text-lg">
        Page <strong>{currentPage}</strong> of {pages}
      </span>

      <button
        onClick={() => handleChangePage(next)}
        disabled={!next}
        className="btn-icon text-[1.5rem] "
        aria-label="Next page"
      >
        <FaRegArrowAltCircleRight />
      </button>
    </div>
  );
};
