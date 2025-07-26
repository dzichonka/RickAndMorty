//import { Component } from 'react';

type RefreshButtonProps = {
  onClick?: () => void;
};
const RefreshButton = ({ onClick }: RefreshButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className="btn" onClick={handleClick}>
      Fix it!
    </button>
  );
};

export default RefreshButton;
