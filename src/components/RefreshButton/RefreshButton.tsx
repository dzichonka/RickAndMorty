'use client';

const RefreshButton = () => {
  return (
    <button className="btn" onClick={() => window.location.reload()}>
      Fix it!
    </button>
  );
};

export default RefreshButton;
