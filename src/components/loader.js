import React from 'react';

const Loader = ({ size = '40', color = '#D35400' }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#0A0A0A]">
      <div
        className={`w-${size} h-${size} border-8 border-t-8 border-solid border-gray-300 border-t-[${color}] rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;
