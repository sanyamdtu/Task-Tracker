import React from "react";
import { useState } from "react";
const Addtask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const onsub = (e) => {
    e.preventDefault();
    if (!text) {
      alert("please add text");
      return;
    }
    onAdd({ text, day, reminder });
    setText("");
    setDay("");
    setReminder("");
  };
  return (
    <form className="add-form" onSubmit={onsub}>
      <div className="form-control">
        <label>Tasks</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day</label>
        <input
          type="text"
          placeholder="Day of task"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          placeholder="Set Reminder"
          value={reminder}
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" className="btn btn-block" value="Save Task"></input>
    </form>
  );
};

export default Addtask;
