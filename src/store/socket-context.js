import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

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

  async function updateUserStatusHandler(userUpdate) {
    const userUuid = uuidv4();
    const messageData = {
      company: company,
      author: currentUser,
      status: userUpdate,
      uuid: userUuid,
    };

    await socket.emit("client_update", messageData);
    console.log(
      "context recieved the update status of: ",
      userUpdate + userUuid
    );
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
