import './App.css';
import React from 'react';

import MainRouter from './components/routing/MainRouter';
import { useAxiosIntercept } from './hooks/useAxiosIntercept';
import { ThemeProvider, createTheme } from '@mui/material';

const App = () => {
  const [isInterceptReady] = useAxiosIntercept();

  const theme = createTheme({
    palette: {
      mode: 'light',
      mainColor: {
        main: '#24344C',
        text: '#fff'
      },
      mainButton: {
        main: '#24344C',
        light: 'rgb(79, 92, 111)',
        dark: 'rgb(25, 36, 53)',
        contrastText: '#fff'
      },
      secondaryButton: {
        main: '#3b5071',
        dark: '#29384F',
        contrastText: '#fff',
        light: {
          main: '#62738D',
          dark: '#29384F',
          contrastText: '#fff'
        }
      },
      'secondaryButton.light': {
        main: '#62738D',
        dark: '#29384F',
        contrastText: '#fff'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">{isInterceptReady && <MainRouter />}</div>
    </ThemeProvider>
  );
};

export default App;
