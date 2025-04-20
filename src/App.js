import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Dashboard from './auth/dashboard';
import Register from './auth/register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/loader';

function App() {
  const { registrationStatus, userName, userAddress, totalUsers, lastExpense } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (registrationStatus) {

      setTimeout(() => {
        setLoading(false); 
      }, 2000);
    }
  }, [registrationStatus]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {registrationStatus ? (
        loading ? (
          <Loader size="24" color="#D35400" /> 
        ) : (
          <Dashboard
            userName={userName}
            userAddress={userAddress}
            totalUsers={totalUsers}
            lastExpense={lastExpense}
          />
        )
      ) : (
        <Register />
      )}
    </>
  );
}

export default App;
