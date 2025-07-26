import { useState } from 'react';

const ErrorButton = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error from button!');
  }

  return (
    <button
      className="btn absolute top-5 right-5"
      onClick={() => setShouldThrow(true)}
    >
      Error
    </button>
  );
};

export default ErrorButton;
