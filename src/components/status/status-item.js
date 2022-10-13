import Card from "../ui/card";
import classes from "./status-item.module.css";

function StatusItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div
          className={`${classes.content} ${
            props.status === "On Vacation" ? classes.vacation : ""
          }`}
        >
          <div className={classes.contentStart}>{props.name}</div>
          <div className={classes.contentEnd}>{props.status}</div>
        </div>
      </Card>
    </li>
  );
}

export default StatusItem;
