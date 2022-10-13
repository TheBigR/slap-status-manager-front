import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import StatusFilter from "../components/status/status-filter";
import StatusList from "../components/status/status-list";
import StatusUpdate from "../components/status/status-update";
import SocketContext from "../store/socket-context";
import classes from "./status-page.module.css";

function StatusPage() {
  const SocketCtx = useContext(SocketContext);

  useEffect(() => {
    SocketCtx.getStatus();
  }, [SocketCtx.userName]);

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
        <StatusUpdate
          update={SocketCtx.updateUserStatus}
          getStatus={SocketCtx.getStatus}
        />
        <StatusFilter />
        <StatusList />
      </div>
    );
  }
}

export default StatusPage;
