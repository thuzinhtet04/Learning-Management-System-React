import React from 'react';

const LoaderButton = () => {
  return (
    <button
      disabled
      className="px-4 py-2 w-36 h-10 border-white/40 border bg-black/80 animate-pulse rounded-md text-white/70"
    >
      Loading...
    </button>
  );
};

export default LoaderButton;
