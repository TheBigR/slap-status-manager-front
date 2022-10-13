import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SocketContextProvider } from "./store/socket-context";
import io from "socket.io-client";

const root = ReactDOM.createRoot(document.getElementById("root"));
const socket = io.connect("http://localhost:3001");
root.render(
  <SocketContextProvider socket={socket} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SocketContextProvider>
);
