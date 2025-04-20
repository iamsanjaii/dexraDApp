import React from 'react'
import Navbar from '../components/navbar.js';
import Greetings from '../components/greetings.js';
import { Transaction } from 'ethers';
import Transactions from '../components/transactions.js';
import { FiRefreshCcw } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import NewTransactionMenu from '../components/newtransaction.js';
export default function Dashboard() {
  const { userName } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTransactionSubmit = (address, amount) => {
    console.log("Transaction submitted", { address, amount });

  };

  return (
    <div className='shadow-lg flex flex-col min-h-screen bg-[#0A0A0A] px-6 py-4'>
      <Navbar />
      <Greetings name={userName || "Guest"} />

      <div className='flex flex-col items-center justify-center w-full h-full px-4 mt-4'>
        <p className='text-lg text-white'>Recent Transactions</p>
        <Transactions />
        <button className='bg-[#D35400] hover:bg-[#e26516] flex items-center gap-4 transition-colors text-white px-4 py-2 rounded-md shadow-md font-medium mt-4'>
          Refresh
          <FiRefreshCcw className="text-white" />
        </button>
      </div>


      <button className="fixed bottom-6 right-6 bg-[#D35400] hover:bg-[#e26516] text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors" onClick={() => setIsModalOpen(true)}>
      <FontAwesomeIcon icon={faCoins} size="2x" color="#fff" />
      </button>

      <NewTransactionMenu
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleTransactionSubmit}
      />
    </div>
  )
}
