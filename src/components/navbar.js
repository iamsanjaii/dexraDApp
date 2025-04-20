import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
  const { userName, userAddress } = useAuth();

  const truncateAddress = (addr) => {
    return addr.slice(0, 6) + '...' + addr.slice(-4);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userAddress);
    toast.success("Address copied to clipboard!");
  };

  return (
    <>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="bg-transparent backdrop-blur-md shadow-lg flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold tracking-wide">Dexra Expense Tracker</h1>
        
        <div className="flex flex-col items-center gap-1">
          <div className='flex items-center gap-2'>   
            <div>
              <button className="bg-[#D35400] hover:bg-[#e26516] transition-colors text-white px-4 py-2 rounded-md shadow-md font-medium">
                {'Wallet Connected'} 
              </button>
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-black font-bold">
              {"S"}   
            </div>
          </div>

          <div className="flex gap-2 items-center mt-1">
            <p className="text-[#D35400] text-sm font-mono">{truncateAddress(userAddress)}</p>
            <button onClick={handleCopy}>
              <FiCopy className="text-[#D35400] cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
