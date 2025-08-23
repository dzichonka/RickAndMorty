import { LuRefreshCw } from 'react-icons/lu';

type RefetchButtonProps = {
  onClick: () => void;
};

export const RefetchButton = ({ onClick }: RefetchButtonProps) => {
  return (
    <button
      className="btn-icon  text-[1.5rem] "
      data-testid="refresh"
      onClick={() => onClick()}
    >
      <LuRefreshCw />
    </button>
  );
};
