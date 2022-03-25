import React, { useState } from "react";
import { backlog, in_progress, completed } from "../../data/tasks";

const TasksPage = () => {
  const [backlogTasks, setBacklogTasks] = useState(backlog);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const startTask = (task) => {
    setInProgressTasks([...inProgressTasks, task]);
    var newBacklog = [];
    backlogTasks.map((backlogTask) => {
      if (backlogTask != task) {
        newBacklog.push(backlogTask);
      }
    });
    setBacklogTasks(newBacklog);
  };
  const completeTask = (task) => {
    setCompletedTasks([...completedTasks, task]);
    var newInProgress = [];
    inProgressTasks.map((inProgressTask) => {
      if (inProgressTask != task) {
        newInProgress.push(inProgressTask);
      }
    });
    setInProgressTasks(newInProgress);
  };
  const deleteTask = (task) => {
    var newCompleted = [];
    completedTasks.map((completedTask) => {
      if (completedTask != task) {
        newCompleted.push(completedTask);
      }
    });
    setCompletedTasks(newCompleted);
  };
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <h6>Backlog</h6>
          <ul className="list-group">
            {backlogTasks.map((task) => {
              return (
                <>
                  <li className="list-group-item d-flex justify-content-between">
                    {task.title}
                    <button
                      className="btn btn-default btn-warning"
                      onClick={() => startTask(task)}
                    >
                      Start
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div className="col-md-4">
          <h6>In Progress</h6>
          <ul className="list-group">
            {inProgressTasks.map((task) => {
              return (
                <>
                  <li className="list-group-item d-flex justify-content-between">
                    {task.title}
                    <button
                      className="btn btn-default btn-success"
                      onClick={() => completeTask(task)}
                    >
                      Done
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div className="col-md-4">
          <h6>Completed</h6>
          <ul className="list-group">
            {completedTasks.map((task) => {
              return (
                <>
                  <li className="list-group-item d-flex justify-content-between">
                    {task.title}
                    <button
                      className="btn btn-default btn-danger"
                      onClick={() => deleteTask(task)}
                    >
                      Delete
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TasksPage;
