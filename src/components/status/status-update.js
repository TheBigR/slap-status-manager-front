import { useRef } from "react";
import classes from "./status-update.module.css";

function StatusUpdate(props) {
  const statusInputRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const selectedStatus = statusInputRef.current.value;
    props.update(selectedStatus);    
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="status">Status</label>
          <select id="status" ref={statusInputRef}>
            <option value="Working">Working</option>
            <option value="Working Remotley">Working Remotley</option>
            <option value="On Vacation">On Vacation</option>
            <option value="Business Trip">Business Trip</option>
          </select>
        </div>
        <button>Update Status</button>
      </div>
    </form>
  );
}

export default StatusUpdate;
