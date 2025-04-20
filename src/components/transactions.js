import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../Ether/ethers'; 

export default function Transactions({ contract }) {
  const [transactions, setTransactions] = useState([]);

  const TransactionBar = ({ name, address, amount, time }) => {
    return (
      <div className="flex bg-[#2A2A2A] gap-8 p-4 rounded-lg shadow-lg items-center justify-between mt-2">
        <h2 className="text-white text-center text-lg font-semibold flex-1">{name}</h2>
        <h2 className="text-white text-center text-lg font-semibold flex-1 truncate">{address}</h2>
        <h2 className="text-white text-center text-lg font-semibold flex-1">{amount} ETH</h2>
        <h2 className="text-white text-center text-lg font-semibold flex-1">{time}</h2>
      </div>
    );
  };

  useEffect(() => {
    const loadTxs = async () => {
      if (!contract) return;

      const txs = await fetchTransactions(contract);
      const transactionsWithNames = await Promise.all(
        txs.map(async (tx) => {

          const userName = await contract.getMyName(tx.sender);
          return {
            ...tx,
            name: userName || "--", 
          };
        })
      );

      setTransactions(transactionsWithNames.reverse()); 
    };

    loadTxs();
  }, [contract]);

  return (
    <div className="w-full max-w-4xl flex flex-col">
      <div className="flex bg-[#D35400] gap-8 p-4 rounded-lg shadow-lg items-center justify-between">
        <h2 className="text-white text-center text-lg font-semibold flex-1">Name</h2>
        <h2 className="text-white text-center text-lg font-semibold flex-1">Address</h2>
        <h2 className="text-white text-center text-lg font-semibold flex-1">Amount</h2>
        <h2 className="text-white text-center text-lg font-semibold flex-1">Time</h2>
      </div>

      <div>
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-center mt-4">No transactions found.</p>
        ) : (
          transactions.map((tx, idx) => (
            <TransactionBar
              key={idx}
              name={tx.name}
              address={tx.sender}
              amount={tx.amount}
              time={new Date(tx.timestamp * 1000).toLocaleTimeString()} 
            />
          ))
        )}
      </div>
    </div>
  );
}
