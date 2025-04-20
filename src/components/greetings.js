import React from 'react'

export default function Greetings({ name }) {
  return (
    <div>
      <h1 className="text-white text-4xl font-semibold tracking-wide">
        Welcome, <span className="text-[#D35400]">{"Sanjai"}</span>!
      </h1>
      <p className="text-gray-400 text-md mt-2">This is your personalized dashboard.</p>
    </div>
  );
}
