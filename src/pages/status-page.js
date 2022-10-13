import { useContext } from "react";
import { Link } from "react-router-dom";
import StatusUpdate from "../components/status/status-update";
import SocketContext from "../store/socket-context";
import classes from "./status-page.module.css";

function StatusPage() {
  const SocketCtx = useContext(SocketContext);
  

  if (SocketCtx.userName === "Guest") {
    return (
      <div>
        <h1>Hello Guest, Please Login.</h1>
        <Link to="/login" className={classes.btn}>
          Login
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <StatusUpdate update={SocketCtx.updateUserStatus}/>

        <h1>Working?</h1>
      </div>
    );
  }
}

export default StatusPage;
