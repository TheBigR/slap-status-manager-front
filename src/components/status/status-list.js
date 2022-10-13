import classes from "./status-list.module.css";
import StatusItem from "./status-item";

function StatusList(props) {
  return (
    <div>
      <h1>StatusList</h1>
      <ul className={classes.list}>
        {props.status.map((status) => (
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
