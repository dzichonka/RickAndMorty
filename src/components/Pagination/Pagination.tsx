import type { IInfo } from '@/types/api-types';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

type PaginationProps = {
  info: IInfo;
};
export const Pagination = ({ info }: PaginationProps): React.JSX.Element => {
  const { next, prev, pages } = info;
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const handleChangePage = (url: string | null) => {
    if (!url) return;
    const page = new URL(url).searchParams.get('page');
    if (page) {
      searchParams.set('page', page);
      setSearchParams(searchParams);
    }
  };

  return (
    <div
      className="flex items-center justify-center gap-4 bg-[var(--bg-color)]/60 shadow-[0_0_25px_30px_var(--bg-color)]/60 rounded-ful w-fit text-center p-4"
      data-testid="pagination"
    >
      <button
        onClick={() => handleChangePage(prev)}
        disabled={!prev}
        className="btn-icon"
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
        className="btn-icon"
        aria-label="Next page"
      >
        <FaRegArrowAltCircleRight />
      </button>
    </div>
  );
};
