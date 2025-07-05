import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { connectMetaMask, getContract, registerUser, getUserName } from '../Ether/ethers';

export default function Register() {
  const [name, setName] = useState('');
  const [registeredName, setRegisteredName] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { signer } = await connectMetaMask();
      const contract = getContract(signer);
      const success = await registerUser(contract, name);
      if (success) {
        const fetchedName = await getUserName(contract);
        console.log("Fetched name:", fetchedName);
        setRegisteredName(fetchedName);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-lg flex flex-col min-h-screen bg-[#0A0A0A] px-6 py-4">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-white text-2xl font-semibold">Dexra BlockChain Expense Tracker</h1>
        <div className="flex flex-col items-center justify-center w-full h-full px-4 mt-4">
          <div className="bg-[#2A2A2A] bg-opacity-50 backdrop-blur-lg items-center rounded-lg p-6 w-full max-w-xs mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-transparent text-white p-2 rounded-md w-full mb-4 border-none focus:outline-none"
            />
            <div className="flex justify-end items-center">
              <button
                className="flex items-center gap-2 bg-[#D35400] hover:bg-[#e26516] text-white px-4 py-2 rounded-md shadow-md font-medium"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
                <FiArrowRight />
              </button>
            </div>
            {registeredName && (
              <p className="text-green-400 mt-4">
                👋 Hello, {registeredName}! You’re now registered.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
