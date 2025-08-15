'use client';
import { useState } from 'react';
import { FaExplosion } from 'react-icons/fa6';

const ErrorButton = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error from button!');
  }

  return (
    <button
      className="btn-icon text-[1.5rem]"
      onClick={() => setShouldThrow(true)}
    >
      <FaExplosion />
    </button>
  );
};

export default ErrorButton;
