import classes from "./status-list.module.css";
import StatusItem from "./status-item";
import { useContext, useEffect, useState } from "react";
import SocketContext from "../../store/socket-context";

function StatusList() {
  const socketCtx = useContext(SocketContext);
  const [currentStatus, setCurrentStatus] = useState([]);

  useEffect(() => {
    setCurrentStatus(socketCtx.currentStatus);
  }, [socketCtx]);

  if (socketCtx.currentStatus.length === 0) {
    return (
      <div>
        <h1>No Current Status</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>StatusList</h1>
      <ul className={classes.list}>
        {currentStatus.map((status) => (
          <StatusItem
            key={status.key}
            name={status.name}
            status={status.status}
          />
        ))}
      </ul>
    </div>
  );
}

export default StatusList;
