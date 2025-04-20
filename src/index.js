import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import Register from './auth/register';
import Dashboard from './auth/dashboard';
import './index.css'; // Ensure this is correct


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
