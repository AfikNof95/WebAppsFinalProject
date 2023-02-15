import './App.css';
import React, { useEffect } from 'react';

import MainRouter from './components/routing/MainRouter';
import { useAxiosIntercept } from './hooks/useAxiosIntercept';
import { Alert, Snackbar, ThemeProvider, createTheme } from '@mui/material';
import useSnackBar from './hooks/useSnackBar';

const App = () => {
  const [isInterceptReady] = useAxiosIntercept();
  const [snackBarState,setSnackBarState] = useSnackBar();


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
      <Snackbar
        open={snackBarState.show}
        onClose={() => setSnackBarState({ ...snackBarState, ...{ show: false } })}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <Alert
          severity={snackBarState.severity}
          variant="filled"
          sx={{ width: '100%', marginTop: 3 }}>
          {snackBarState.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
