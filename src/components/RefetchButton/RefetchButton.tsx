import { LuRefreshCw } from 'react-icons/lu';

type RefetchButtonProps = {
  onClick: () => void;
};

export const RefetchButton = ({ onClick }: RefetchButtonProps) => {
  return (
    <button
      className="btn-icon"
      data-testid="refresh"
      onClick={() => onClick()}
    >
      <LuRefreshCw />
    </button>
  );
};
