import { createContext, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext({
    socket: ""
})

export function SocketContextProvider(props) {
    const [currentUser, setCurrentUser] = useState("")


    const context = {
        userName: currentUser,
        socket: io.connect("http://localhost:3001")
    }
    
    return (
        <SocketContext.Provider value={context}>
            {props.children}
        </SocketContext.Provider>
    )
}



export default SocketContext