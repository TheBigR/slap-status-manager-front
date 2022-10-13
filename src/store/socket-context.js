import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
  const socket = props.socket;
  const [currentUser, setCurrentUser] = useState("Guest");
  const [status, setStatus] = useState([]);

  function parseResp(data) {
    let currentStatus = [];
    Object.keys(data).forEach((stat) => {
      currentStatus.push({
        name: stat,
        key: data[stat].uuid,
        status: data[stat].status,
      });
    });
    return currentStatus;
  }

  useEffect(() => {
    socket.on("server_update", (data) => {
      setStatus(parseResp(data));
    });
  }, [socket]);

  useEffect(() => {
    if (currentUser !== "Guest") {
      socket.emit("join_company", company);
    }
  }, [currentUser, socket]);

  function updateCurrentUserHandler(user) {
    setCurrentUser(user);
  }

  function logoutHandler() {
    setCurrentUser("Guest");
  }

  async function getStatusHandler() {
    const data = await (await fetch(`http://localhost:3001/latest`)).json();
    setStatus(parseResp(data));
  }

  async function updateUserStatusHandler(userUpdate) {
    const messageData = {
      company: company,
      author: currentUser,
      status: userUpdate,
      uuid: uuidv4(),
    };
    await socket.emit("client_update", messageData);

    const update = status.find((obj) => obj.name === currentUser);

    console.log("existing user? ", update);
    if (update) {
      setStatus(
        status.map((obj) => {
          if (obj.name === currentUser) {
            return { ...obj, status: userUpdate };
          }

          return obj;
        })
      );
    } else {
      setStatus([
        ...status,
        { name: currentUser, status: userUpdate, key: messageData.uuid },
      ]);
    }
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
