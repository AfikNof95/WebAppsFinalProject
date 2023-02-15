import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { CookiesProvider } from 'react-cookie';
import { WebSocketContextProvider } from './context/WebSocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <Router>
      <WebSocketContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthContextProvider>
            <ShoppingCartProvider>
              <App />
            </ShoppingCartProvider>
          </AuthContextProvider>
        </LocalizationProvider>
      </WebSocketContextProvider>
    </Router>
  </CookiesProvider>
);
