import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  connectMetaMask,
  getContract,
  getUserName,
  checkRegistration,
  getTotalUsers,
  getLastExpenseLabel
} from '../Ether/ethers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastExpense, setLastExpense] = useState('');
  const [loading, setLoading] = useState(false);

  const connectAndFetchData = async () => {
    setLoading(true);
    try {
      const { provider, signer, userAddress } = await connectMetaMask();
      if (!userAddress) {
        console.error('No wallet address found.');
        return;
      }
  
      setUserAddress(userAddress);
      const contract = getContract(signer);
  
      const isRegistered = await checkRegistration(contract, userAddress);
      setRegistrationStatus(isRegistered);
  
      if (isRegistered) {
        const name = await getUserName(contract, userAddress); 
        setUserName(name || "Not registered");
      } else {
        setUserName("Not registered");
      }
  
      const totalRegisteredUsers = await getTotalUsers(contract);
      setTotalUsers(totalRegisteredUsers);
  
      const lastExpenseLabel = await getLastExpenseLabel(contract);
      setLastExpense(lastExpenseLabel);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    connectAndFetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userAddress,
        userName,
        registrationStatus,
        totalUsers,
        lastExpense,
        loading,
        connectAndFetchData,
        setRegistrationStatus,
        setUserName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
