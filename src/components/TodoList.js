import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { v4 as uuidv4 } from "uuid";

const TodoListApp = () => {
  const [lists, setLists] = useState(() => {
    const storedLists = localStorage.getItem("lists");
    return storedLists
      ? JSON.parse(storedLists)
      : [{ id: uuidv4(), name: "My Tasks", tasks: [] }];
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

  const addTaskToList = (listId, taskText) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                { id: uuidv4(), text: taskText, done: false },
              ],
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
    <div
      className="container mt-4"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="d-flex justify-content-between mb-3">
        <h1>Your Lists</h1>
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
            class="bi bi-plus-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
          </svg>
        </button>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {lists.map((list) => (
          <TodoList
            key={list.id}
            list={list}
            onAddTask={addTaskToList}
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
  onToggleDone,
  onDeleteTask,
  onDeleteList,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onAddTask(list.id, inputValue);
      setInputValue("");
    }
  };

  const completedTasks = list.tasks.filter((task) => task.done);
  const activeTasks = list.tasks.filter((task) => !task.done);

  return (
    <div className="card shadow-sm m-3" style={{ width: "300px" }}>
      <div className="card-body">
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
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a task"
            style={{ boxShadow: "none" }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                onAddTask(list.id, inputValue);
                setInputValue("");
              }}
              style={{ boxShadow: "none" }}
            >
              <i className="bi bi-plus-circle"></i>
            </button>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          {activeTasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-start w-100">
                <input
                  type="checkbox"
                  className="form-check-input mt-1"
                  checked={task.done}
                  onChange={() => onToggleDone(list.id, task.id)}
                  style={{ marginRight: "10px" }}
                />
                <span className="text-wrap" style={{ wordBreak: "break-word" }}>
                  {task.text}
                </span>
              </div>
              <button
                className="btn btn-link text-danger p-0 ml-auto"
                style={{ width: "20px", boxShadow: "none" }}
                onClick={() => onDeleteTask(list.id, task.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
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
                  <div className="d-flex align-items-start w-100">
                    <input
                      type="checkbox"
                      className="form-check-input mt-1"
                      checked={task.done}
                      onChange={() => onToggleDone(list.id, task.id)}
                      style={{ marginRight: "10px" }}
                    />
                    <span
                      className="text-wrap text-decoration-line-through"
                      style={{ wordBreak: "break-word" }}
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    className="btn btn-link text-danger p-0 ml-auto"
                    style={{ width: "20px", boxShadow: "none" }}
                    onClick={() => onDeleteTask(list.id, task.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoListApp;
