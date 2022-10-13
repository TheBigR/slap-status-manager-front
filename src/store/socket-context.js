import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const company = "demoCompany";

const SocketContext = createContext({
  userName: "",
  currentStatus: [],
  updateCurrentUser: (user) => {},
  logout: () => {},
  getStatus: () => {},
  updateUserStatus: (userUpdate) => {},
});

export function SocketContextProvider(props) {
  const [currentUser, setCurrentUser] = useState("Guest");
  const [status, setStatus] = useState([]);

  useEffect(() => {
    if (currentUser !== "Guest") {
      socket.emit("join_company", company);
    }
  }, [currentUser]);

  function updateCurrentUserHandler(user) {
    setCurrentUser(user);
  }

  function logoutHandler() {
    setCurrentUser("Guest");
  }

  function getStatusHandler() {}

  function updateUserStatusHandler(userUpdate) {
    console.log("context recieved the update status of: ", userUpdate);
  }

  const context = {
    userName: currentUser,
    currentStatus: status,
    updateCurrentUser: updateCurrentUserHandler,
    logout: logoutHandler,
    getStatus: getStatusHandler,
    updateUserStatus: updateUserStatusHandler,
  };

  return (
    <SocketContext.Provider value={context}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
