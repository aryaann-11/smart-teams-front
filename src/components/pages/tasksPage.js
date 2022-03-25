import React, { useState } from "react";
import { backlog, in_progress, completed } from "../../data/tasks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../css/tasksPage.css";

const TasksPage = () => {
  const [tasks, setTasks] = useState({
    backlog: backlog,
    inProgress: [],
    completed: [],
  });
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
      endArr.splice(result.destination.index, 0, reorderItem);
      tasks[result.source.droppableId] = startArr;
      tasks[result.destination.droppableId] = endArr;
      setTasks(tasks);
    }
  };
  const deleteTask = (task) => {
    var newCompleted = [];
    tasks.completed.map((completedTask) => {
      if (completedTask != task) {
        newCompleted.push(completedTask);
      }
    });
    setTasks({
      backlog: tasks.backlog,
      inProgress: tasks.inProgress,
      completed: newCompleted,
    });
  };
  return (
    <>
      <div className="row d-flex justify-content-between">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="backlog">
            {(provided) => (
              <div
                className="col-md-3 tasks-col"
                style={{
                  minHeight: "200px",
                  borderWidth: "1px",
                  border: "solid",
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
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className="list-group-item d-flex justify-content-between mt-3"
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
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div
                className="col-md-3 tasks-col"
                style={{
                  minHeight: "200px",
                  borderWidth: "1px",
                  border: "solid",
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
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className="list-group-item d-flex justify-content-between mt-3"
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
          <Droppable droppableId="completed">
            {(provided) => (
              <div
                className="col-md-3 tasks-col"
                style={{
                  minHeight: "200px",
                  borderWidth: "1px",
                  border: "solid",
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
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className="list-group-item d-flex justify-content-between mt-3"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {task.title}
                              <button
                                className="btn btn-default btn-danger"
                                onClick={() => deleteTask(task)}
                              >
                                Delete
                              </button>
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
    </>
  );
};

export default TasksPage;
