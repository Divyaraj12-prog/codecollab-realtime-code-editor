import { createContext, useContext } from "react";
import {io} from "socket.io-client";

const SocketContext = createContext();
const socket = io(import.meta.env.VITE_SOCKET_URL, {
    transports: ['websocket'],
    autoConnect: false,
});


export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
