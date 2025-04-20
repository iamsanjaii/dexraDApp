import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { getUserName } from '../Ether/ethers';
export default function NewTransactionMenu({ isOpen, onClose, onSubmit }) {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const SweetAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Transaction successfull!",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleSubmit = async () => {
    if (!address || !amount) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await onSubmit(address, amount); 
      SweetAlert();
      setAddress('');
      setAmount('');
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">New Transaction</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Recipient Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D35400]"
              placeholder="Enter recipient address"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D35400]"
              placeholder="Enter amount"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#D35400] text-white px-4 py-2 rounded-md hover:bg-[#e26516] transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
}
