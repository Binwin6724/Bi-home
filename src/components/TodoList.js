import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { v4 as uuidv4 } from "uuid";
import '../css/TodoList.css';

const TodoListApp = () => {
  const [lists, setLists] = useState(() => {
    const storedLists = localStorage.getItem("lists");
    return storedLists
      ? JSON.parse(storedLists)
      : [{ id: uuidv4(), name: "To Remember", tasks: [] }];
  });

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const addNewList = () => {
    const listName = prompt("Enter the name for the new list:");
    if (listName) {
      setLists([...lists, { id: uuidv4(), name: listName, tasks: [] }]);
    }
  };

  const addTaskToList = (listId, taskText, taskDetails, taskDateTime) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                {
                  id: uuidv4(),
                  text: taskText,
                  details: taskDetails,
                  dateTime: taskDateTime,
                  done: false,
                },
              ],
            }
          : list
      )
    );
  };

  const updateTaskInList = (listId, taskId, updatedTask) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
              ),
            }
          : list
      )
    );
  };

  const toggleDoneInList = (listId, taskId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
              ),
            }
          : list
      )
    );
  };

  const deleteTaskInList = (listId, taskId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  };

  const deleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
  };

  return (
    <div className="container-todo mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h1 style={{ color: "white" }}>Your Lists</h1>
        <button
          className="btn btn-primary"
          style={{
            marginLeft: "10px",
            width: "50px",
            height: "50px",
            boxShadow: "none",
          }}
          onClick={addNewList}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-plus-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
          </svg>
        </button>
      </div>
      <div className="d-flex flex-wrap justify-content-center flex-direction-row">
        {lists.map((list) => (
          <TodoList
            key={list.id}
            list={list}
            onAddTask={addTaskToList}
            onUpdateTask={updateTaskInList}
            onToggleDone={toggleDoneInList}
            onDeleteTask={deleteTaskInList}
            onDeleteList={deleteList}
          />
        ))}
      </div>
    </div>
  );
};

const TodoList = ({
  list,
  onAddTask,
  onUpdateTask,
  onToggleDone,
  onDeleteTask,
  onDeleteList,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [detailsValue, setDetailsValue] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingInputValue, setEditingInputValue] = useState("");
  const [editingDetailsValue, setEditingDetailsValue] = useState("");
  const [editingDateTime, setEditingDateTime] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const addTaskRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addTaskRef.current && !addTaskRef.current.contains(event.target)) {
        setIsAddingTask(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addTaskRef]);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      onAddTask(list.id, inputValue, detailsValue, dateTime);
      setInputValue("");
      setDetailsValue("");
      setDateTime("");
      setIsAddingTask(false);
    }
  };

  const handleUpdateTask = (taskId) => {
    onUpdateTask(list.id, taskId, {
      text: editingInputValue,
      details: editingDetailsValue,
      dateTime: editingDateTime,
    });
    setEditingTaskId(null);
  };

  const completedTasks = list.tasks.filter((task) => task.done);
  const activeTasks = list.tasks.filter((task) => !task.done);

  return (
    <div className="list-container">
     <div ref={addTaskRef} className="card shadow-sm m-3" style={{width:"400px"}}>
      <div className="card-body" >
        <h5 className="card-title d-flex justify-content-between mb-4">
          {list.name}
          <button
            className="btn btn-link text-danger p-0 ml-auto"
            style={{ marginLeft: "10px", width: "20px", boxShadow: "none" }}
            onClick={() => onDeleteList(list.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </h5>
        {!isAddingTask ? (
          <button
            className="btn btn-link p-0 mb-3"
            onClick={() => setIsAddingTask(true)}
          >
            <i className="bi bi-plus"></i> Add a task
          </button>
        ) : (
          <div className="mb-3">
            <input
              type="text"
              className="form-control mb-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Task title"
              style={{ boxShadow: "none" }}
            />
            <textarea
              className="form-control mb-2"
              value={detailsValue}
              onChange={(e) => setDetailsValue(e.target.value)}
              placeholder="Details"
              style={{ boxShadow: "none" }}
            />
            <input
              type="datetime-local"
              className="form-control mb-2"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              style={{ boxShadow: "none" }}
            />
            <button
              className="btn btn-primary"
              onClick={handleAddTask}
              style={{ boxShadow: "none" }}
            >
              Add Task
            </button>
          </div>
        )}
        <ul className="list-group list-group-flush">
          {activeTasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editingTaskId === task.id ? (
                <div className="w-100">
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editingInputValue}
                    onChange={(e) => setEditingInputValue(e.target.value)}
                    placeholder="Task title"
                    style={{ boxShadow: "none" }}
                  />
                  <textarea
                    className="form-control mb-2"
                    value={editingDetailsValue}
                    onChange={(e) => setEditingDetailsValue(e.target.value)}
                    placeholder="Details"
                    style={{ boxShadow: "none" }}
                  />
                  <input
                    type="datetime-local"
                    className="form-control mb-2"
                    value={editingDateTime}
                    onChange={(e) => setEditingDateTime(e.target.value)}
                    style={{ boxShadow: "none" }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdateTask(task.id)}
                    style={{ boxShadow: "none" }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div
                  className="d-flex align-items-start w-100"
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditingInputValue(task.text);
                    setEditingDetailsValue(task.details);
                    setEditingDateTime(task.dateTime);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input mt-1"
                    checked={task.done}
                    onChange={() => onToggleDone(list.id, task.id)}
                    style={{ marginRight: "10px" }}
                  />
                  <div className="text-wrap" style={{ wordBreak: "break-word" }}>
                    <strong>{task.text}</strong>
                    {task.details && <div>{task.details}</div>}
                    {task.dateTime && (
                      <small className="text-muted">
                        <i className="bi bi-calendar"></i>{" "}
                        {new Date(task.dateTime).toLocaleString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </small>
                    )}
                  </div>
                </div>
              )}
              {editingTaskId !== task.id && (
                <button
                  className="btn btn-link text-danger p-0 ml-auto"
                  style={{ width: "20px", boxShadow: "none" }}
                  onClick={() => onDeleteTask(list.id, task.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="btn btn-link p-0 text-decoration-none d-flex align-items-start mb-3"
            style={{ boxShadow: "none", outline: "none" }}
          >
            <i
              className={`bi ${showCompleted ? "bi-chevron-down" : "bi-chevron-right"}`}
            ></i>{" "}
            Completed ({completedTasks.length})
          </button>
          {showCompleted && (
            <ul className="list-group list-group-flush">
              {completedTasks.map((task) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {editingTaskId === task.id ? (
                    <div className="w-100">
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={editingInputValue}
                        onChange={(e) => setEditingInputValue(e.target.value)}
                        placeholder="Task title"
                        style={{ boxShadow: "none" }}
                      />
                      <textarea
                        className="form-control mb-2"
                        value={editingDetailsValue}
                        onChange={(e) => setEditingDetailsValue(e.target.value)}
                        placeholder="Details"
                        style={{ boxShadow: "none" }}
                      />
                      <input
                        type="datetime-local"
                        className="form-control mb-2"
                        value={editingDateTime}
                        onChange={(e) => setEditingDateTime(e.target.value)}
                        style={{ boxShadow: "none" }}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUpdateTask(task.id)}
                        style={{ boxShadow: "none" }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div
                      className="d-flex align-items-start w-100"
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditingInputValue(task.text);
                        setEditingDetailsValue(task.details);
                        setEditingDateTime(task.dateTime);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input mt-1"
                        checked={task.done}
                        onChange={() => onToggleDone(list.id, task.id)}
                        style={{ marginRight: "10px" }}
                      />
                      <div
                        className="text-wrap text-decoration-line-through"
                        style={{ wordBreak: "break-word" }}
                      >
                        <strong>{task.text}</strong>
                        {task.details && <div>{task.details}</div>}
                        {task.dateTime && (
                          <small className="text-muted">
                            <i className="bi bi-calendar"></i>{" "}
                            {new Date(task.dateTime).toLocaleString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </small>
                        )}
                      </div>
                    </div>
                  )}
                  {editingTaskId !== task.id && (
                    <button
                      className="btn btn-link text-danger p-0 ml-auto"
                      style={{ width: "20px", boxShadow: "none" }}
                      onClick={() => onDeleteTask(list.id, task.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TodoListApp;
