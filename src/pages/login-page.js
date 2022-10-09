import { useContext, useRef } from "react";
import Card from "../components/ui/card";
import SocketContext from "../store/socket-context";

import classes from "./login-page.module.css";

function LoginPage() {
  const SocketCtx = useContext(SocketContext);
  const nameInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;    
    SocketCtx.updateCurrentUser(enteredName);
  }

  if (SocketCtx.userName !== "Guest") {
    return (
      <Card>
        <div>
          <h1>Welcome {SocketCtx.userName}</h1>
          <h3>would you like to logout?</h3>
        </div>
        <div className={classes.actions}>
          <button onClick={SocketCtx.logout}>Logout</button>
        </div>
      </Card>
    );
  } else {
    return (
      <Card>
        <h1>Welcome</h1>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.control}>
            <label htmlFor="name">Name: </label>
            <input type="text" required id="name" ref={nameInputRef} />
          </div>
          <div className={classes.actions}>
            <button>Login</button>
          </div>
        </form>
      </Card>
    );
  }
}

export default LoginPage;
