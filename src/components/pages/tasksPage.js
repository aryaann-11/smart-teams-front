import React, { useState } from "react";
import { backlog, in_progress, completed } from "../../data/tasks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TasksPage = () => {
  const [backlogTasks, setBacklogTasks] = useState(backlog);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const onDragEndBacklog = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(backlogTasks);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);
    setBacklogTasks(items);
  };
  const onDragEndInProgress = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(inProgressTasks);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);
    setInProgressTasks(items);
  };
  const onDragEndCompleted = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(completedTasks);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);
    setCompletedTasks(items);
  };
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
          <DragDropContext onDragEnd={onDragEndBacklog}>
            <Droppable droppableId="backlog">
              {(provided) => (
                <ul
                  className="list-group"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {backlogTasks.map((task, index) => {
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
                                className="btn btn-default btn-warning"
                                onClick={() => startTask(task)}
                              >
                                Start
                              </button>
                            </li>
                          )}
                        </Draggable>
                      </>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="col-md-4">
          <h6>In Progress</h6>
          <DragDropContext onDragEnd={onDragEndInProgress}>
            <Droppable droppableId="inProgress">
              {(provided) => (
                <ul
                  className="list-group"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {inProgressTasks.map((task, index) => {
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
                                className="btn btn-default btn-success"
                                onClick={() => completeTask(task)}
                              >
                                Done
                              </button>
                            </li>
                          )}
                        </Draggable>
                      </>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="col-md-4">
          <h6>Completed</h6>
          <DragDropContext onDragEnd={onDragEndCompleted}>
            <Droppable droppableId="completed">
              {(provided) => (
                <ul
                  className="list-group"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {completedTasks.map((task, index) => {
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
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default TasksPage;
