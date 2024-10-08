import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-t-4 border-b-4 border-primaryColor rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
