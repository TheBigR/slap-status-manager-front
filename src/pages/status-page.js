import { useContext } from "react";
import { Link } from "react-router-dom";
import StatusFilter from "../components/status/status-filter";
import StatusList from "../components/status/status-list";
import StatusUpdate from "../components/status/status-update";
import SocketContext from "../store/socket-context";
import classes from "./status-page.module.css";

function StatusPage() {
  const dummyStatus = [
    { key: 1, name: "moshe", status: "working" },
    { key: 11, name: "zoobi", status: "working" },
    { key: 111, name: "kaboobi", status: "On Vacation" },
    { key: 1111, name: "no", status: "Working Remotely" },
    { key: 11111, name: "time", status: "On Vacation" },
  ];
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
        <StatusUpdate update={SocketCtx.updateUserStatus} />
        <StatusFilter />
        <StatusList status={dummyStatus} />
      </div>
    );
  }
}

export default StatusPage;
