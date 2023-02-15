import React, { useState, useContext, createContext, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const WebSocketContext = createContext({
  wsURL: String,
  setWsURL: () => {},
  isSocketOpen: Boolean,
  setIsSocketOpen: () => {},
  lastJsonMessage: () => {},
  sendJsonMessage: () => {},
  readyState: Number
});

export function useWebSocketServer() {
  return useContext(WebSocketContext);
}

export const WebSocketContextProvider = ({ children }) => {
  const [wsURL, setWsURL] = useState(null);
  const [isSocketOpen, setIsSocketOpen] = useState(false);

  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(wsURL, {
    share: true,
    shouldReconnect: () => true,
    onOpen: () => {
      console.log('WebSocket opened');
    }
  });

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      setIsSocketOpen(true);
    }
    if (readyState === ReadyState.CLOSED) {
      setIsSocketOpen(false);
    }
    if (readyState === ReadyState.UNINSTANTIATED) {
      setIsSocketOpen(false);
      setWsURL('ws://localhost:2309');
    }
  }, [readyState]);

  const value = {
    wsURL,
    setWsURL,
    isSocketOpen,
    setIsSocketOpen,
    lastJsonMessage,
    sendJsonMessage,
    readyState
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};

export default WebSocketContext;
