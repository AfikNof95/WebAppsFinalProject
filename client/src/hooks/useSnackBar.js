import { useEffect, useState } from 'react';
import { useWebSocketServer } from '../context/WebSocketContext';

const useSnackBar = () => {
  const { lastJsonMessage } = useWebSocketServer();
  const [snackBarState, _setSnackBarState] = useState({
    message: '',
    severity: 'info',
    show: false
  });

  const setSnackBarState = (state) => {
    _setSnackBarState(() => ({ ...state }));
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.type === 'BROADCAST_ALL') {
        _setSnackBarState({
          message: lastJsonMessage.message,
          show: true,
          severity: lastJsonMessage.severity || 'info'
        });
      }
    }
  }, [lastJsonMessage]);

  return [snackBarState, setSnackBarState];
};

export default useSnackBar;
