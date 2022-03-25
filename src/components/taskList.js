import React from "react";
import Task from "./task";

const TaskList = ({ listName, listType }) => {
  var taskAction = "";
  if (listType == "-1") {
    taskAction = "start";
  } else if (listType == "0") {
    taskAction = "completed";
  } else if (listType == "1") {
    taskAction = "delete";
  }
  return (
    <>
      <h1>{listName}</h1>
      <ul className="list-group">
        <li className="list-group-item">
          Item 1 <button className="btn btn-default">{taskAction}</button>
        </li>
        <li className="list-group-item">
          Item 1 <button className="btn btn-default">{taskAction}</button>
        </li>
        <li className="list-group-item">
          Item 1 <button className="btn btn-default">{taskAction}</button>
        </li>
      </ul>
    </>
  );
};

export default TaskList;
