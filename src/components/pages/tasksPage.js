import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const TasksPage = () => {
  const [tasks, setTasks] = useState({
    backlog: [],
    inProgress: [],
    completed: [],
  });
  const [newTask, setNewTask] = useState("Untitled");
  const [isLoading, setIsLoading] = useState(true);
  const handleChange = (e) => {
    setNewTask(e.target.value);
  };
  const handleSubmit = () => {
    if (newTask == "") {
      alert("Please enter a valid title for this task");
      return;
    }
    console.log(newTask);
    axios
      .post("http://localhost:8000/tasks/add/", {
        task: { title: newTask },
      })
      .then((res) => {
        console.log(res.data.message);
        setTasks({
          backlog: [...tasks.backlog, res.data.task],
          inProgress: tasks.inProgress,
          completed: tasks.completed,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Could not add task");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/tasks/")
      .then((res) => {
        console.log(res.data);
        var backlogTasks = [];
        var inProgressTasks = [];
        var completedTasks = [];
        res.data.tasks.map((task) => {
          if (task.status == -1) {
            backlogTasks.push(task);
          } else if (task.status == 0) {
            inProgressTasks.push(task);
          } else if (task.status == 1) {
            completedTasks.push(task);
          }
        });
        setTasks({
          backlog: backlogTasks,
          inProgress: inProgressTasks,
          completed: completedTasks,
        });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const onDragEnd = (result) => {
    if (!result.destination) {
      console.log("No destination");
      console.log(result);
      return;
    }
    console.log(result);
    if (result.source.droppableId == result.destination.droppableId) {
      var items = [];
      if (result.source.droppableId == "backlog") {
        items = Array.from(tasks.backlog);
        const [reorderItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderItem);
        setTasks({
          backlog: items,
          inProgress: tasks.inProgress,
          completed: tasks.completed,
        });
      } else if (result.source.droppableId == "inProgress") {
        items = Array.from(tasks.inProgress);
        const [reorderItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderItem);
        setTasks({
          backlog: tasks.backlog,
          inProgress: items,
          completed: tasks.completed,
        });
      } else if (result.source.droppableId == "completed") {
        items = Array.from(tasks.completed);
        const [reorderItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderItem);
        setTasks({
          backlog: tasks.backlog,
          inProgress: tasks.inProgress,
          completed: items,
        });
      }
    } else {
      var startArr = tasks[result.source.droppableId];
      var endArr = tasks[result.destination.droppableId];
      const [reorderItem] = startArr.splice(result.source.index, 1);
      const droppedAt = result.destination.droppableId;
      var newStatus = -1;
      if (droppedAt == "backlog") {
        newStatus = -1;
      } else if (droppedAt == "inProgress") {
        newStatus = 0;
      } else if (droppedAt == "completed") {
        newStatus = 1;
      }
      reorderItem.status = newStatus;
      endArr.splice(result.destination.index, 0, reorderItem);
      tasks[result.source.droppableId] = startArr;
      tasks[result.destination.droppableId] = endArr;
      setTasks(tasks);
    }
  };
  const handleSave = () => {
    console.log(tasks);
    const allTasks = [
      ...tasks.backlog,
      ...tasks.inProgress,
      ...tasks.completed,
    ];
    axios
      .post("http://localhost:8000/tasks/update/", { tasks: allTasks })
      .then((res) => {
        alert(res.data.message);
        console.log(res.data.message);
      })
      .catch((err) => {
        alert("Could not save task lists successfully");
        console.log(err);
      });
  };
  return (
    <>
      <div className="mb-3">
        <label for="taskInput" className="form-label">
          Task Title
        </label>
        <input
          type="text"
          className="form-control"
          id="taskInput"
          value={newTask}
          onChange={handleChange}
        ></input>
        <button className="btn btn-primary mt-2" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="row d-flex justify-content-between">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="backlog" key={0}>
            {(provided) => (
              <div
                className="col-md-3 tasks-col"
                style={{
                  minHeight: "200px",
                }}
              >
                <h6>Backlog</h6>
                <ul
                  className="list-group"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.backlog.map((task, index) => {
                    return (
                      <>
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className="list-group-item d-flex justify-content-between mt-1 task backlog-task"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {task.title}
                            </li>
                          )}
                        </Draggable>
                      </>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
          <Droppable droppableId="inProgress" key={1}>
            {(provided) => (
              <div
                className="col-md-3 tasks-col"
                style={{
                  minHeight: "200px",
                }}
              >
                <h6>In Progress</h6>
                <ul
                  className="list-group"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.inProgress.map((task, index) => {
                    return (
                      <>
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className="list-group-item d-flex justify-content-between mt-1 task in-progress-task"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {task.title}
                            </li>
                          )}
                        </Draggable>
                      </>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
          <Droppable droppableId="completed" key={2}>
            {(provided) => (
              <div
                className="col-md-3 tasks-col"
                style={{
                  minHeight: "200px",
                }}
              >
                <h6>Completed</h6>
                <ul
                  className="list-group"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.completed.map((task, index) => {
                    return (
                      <>
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className="list-group-item d-flex justify-content-between mt-1 task completed-task"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {task.title}
                            </li>
                          )}
                        </Draggable>
                      </>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-md-4 d-flex justify-content-center">
          <button
            className="btn btn-outline-success btn-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default TasksPage;
