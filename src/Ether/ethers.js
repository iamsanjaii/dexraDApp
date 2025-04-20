import { ethers } from 'ethers';
import { BrowserProvider } from 'ethers';
import contractABI from '../abi/abi.json';
export const connectMetaMask = async () => {
  if (typeof window.ethereum === 'undefined') {
    console.log("MetaMask is not installed!");
    return;
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();
  console.log("Connected Wallet Address: ", userAddress);

  return { provider, signer, userAddress };
};


export const getContract = (signer) => {


  const contractAddress = "0x26d49b1c682fD31293aD74ECC8bc7ee246CD663E";
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
};

export const checkRegistration = async (contract, userAddress) => {
    try {
      const registrationStatus = await contract.isRegistered(userAddress);
      console.log("Registration Status:", registrationStatus); 
      return registrationStatus;
    } catch (error) {
      console.error("Error checking registration status:", error);
      return false; 
    }
  };
  
  

export const getUserName = async (contract) => {
	try {
	  const userName = await contract.getMyName(); 
	  return userName;
	} catch (error) {
	  console.error("Failed to fetch name:", error);
	  return null;
	}
  };
  
  

export const registerUser = async (contract, name) => {
    try {
      const tx = await contract.register(name);
      console.log("Register transaction sent:", tx.hash);
      await tx.wait();
      console.log("User successfully registered!");
      return true;
    } catch (error) {
      console.error("Failed to register user:", error);
      return false;
    }
  };
  

export const getTotalUsers = async (contract) => {
  return await contract.getTotalRegisteredUsers();
};

export const fetchTransactions = async (contract) => {
	try {
	  const transactions = await contract.getAllTransactions();
	  return transactions.map((tx) => ({
		sender: tx.sender,
		receiver: tx.receiver,
		amount: Number(tx.amount),
		label: tx.label,
		timestamp: Number(tx.timestamp),
	  }));
	} catch (error) {
	  console.error("Error fetching transactions:", error);
	  return [];
	}
  };
  
export const getLastExpenseLabel = async (contract) => {
  return await contract.getLastExpenseLabel();
};