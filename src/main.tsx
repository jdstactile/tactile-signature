import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createCustomTheme } from '@tactileentertainment/core-designsystem';
import React from 'react';
import '@tactileentertainment/core-designsystem/styles/global.css';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const theme = createCustomTheme();

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
