import { Link } from "react-router-dom";
import { useContext } from "react";
import SocketContext from "../../store/socket-context";

import classes from "./main-navigation.module.css";

function ButtonHandler(props) {
  console.log(props);
  if (props.socket.userName === "Guest") {
    return (
      <div>
        <a href="/login" className={classes.btn}>
          Login
        </a>
      </div>
    );
  } else {
    return (
      <div onClick={props.socket.logout} className={classes.btn}>
        Logout
      </div>
    );
  }
}

function MainNavigation() {
  const SocketCtx = useContext(SocketContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Slap Status Manager</div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link to="/status">Status</Link>
          </li>
          <li>
            <span className={classes.badge}></span>
          </li>
        </ul>
        <div className={classes.loginContainer}>
          <div>Hello , {SocketCtx.userName}</div>
          <div className={classes.buttonContainer}>
            <ButtonHandler socket={SocketCtx} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
