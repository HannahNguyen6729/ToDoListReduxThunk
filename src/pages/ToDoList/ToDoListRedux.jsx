import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addTaskAPI, completeTaskAPI, deleteTaskAPI, getTaskListAPI, rejectTaskAPI } from "../../redux/actions/ToDoListAction";

export default function ToDoListRedux(props) {
  const showDate = () => {
    let a = new Date();
    return a.getFullYear();
  };
  const { taskList } = useSelector((state) => state.toDoListReducer);
  const dispatch = useDispatch();

  //   let [defaultList, setDefaultList] = useState([]);
  let [task, setTask] = useState({
    values: { taskName: "" },
    errors: { taskName: "" },
  });

  useEffect(() => {
    getTaskList();
  }, []);
  const getTaskList = () => {
    dispatch(getTaskListAPI())
  };

  const renderToDoTask = () => {
    return taskList
      .filter((item) => !item.status)
      .map((task, index) => (
        <li key={index}>
          <span>{task.taskName}</span>
          <div className="buttons">
            <button type="button" className="remove" onClick={() => deleteTask(task.taskName)}>
              <i className="fa fa-trash-alt" />
            </button>
            <button type="button" className="complete">
              <i className="fa fa-check-circle text-success" onClick={() => completeTask(task.taskName)}/>
            </button>
          </div>
        </li>
      ));
  };
  const renderCompletedTask = () => {
    return taskList
      .filter((item) => item.status)
      .map((task, index) => (
        <li key={index}>
          <span>{task.taskName}</span>
          <div className="buttons">
            <button type="button" className="remove" onClick={() => deleteTask(task.taskName)}>
              <i className="fa fa-trash-alt" />
            </button>
            <button type="button" className="complete" onClick={() => rejectTask(task.taskName)}>
              <i className="fa fa-undo text-success" />
            </button>
          </div>
        </li>
      ));
  };
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    let newValues = { ...task.values, [name]: value };
    let newErrors = { ...task.errors };

    const regex = /^[A-Z a-z 0-9]+$/i;

    if (value.trim() === "" || !regex.test(value)) {
      newErrors[name] = name + " is invalid";
    } else {
      newErrors[name] = "";
    }

    setTask({ ...task, values: newValues, errors: newErrors });
  };
  const addTask = (e) => {
    e.preventDefault();
    if (task.errors.taskName === "") {
      dispatch(addTaskAPI(task.values));
      setTask({ ...task, values: { taskName: "" }});
    } else {
      alert("invalid data");
      return;
    }
  };
  const deleteTask = (taskName) => {
    dispatch(deleteTaskAPI(taskName));
  };
  const rejectTask =(taskName) => {
    dispatch(rejectTaskAPI(taskName));
  }
  const completeTask = (taskName) => {
    dispatch(completeTaskAPI(taskName));
  };
  return (
    <div className="card">
      <div className="card__header">
        <img src={require("./img/bg.png")} alt="background img" />
      </div>
      <form onSubmit= {(e) => addTask(e)}>
        <div className="card__body">
          <div className="card__content">
            <div className="card__title">
              <h2>My Tasks</h2>
              <p>{showDate()}</p>
            </div>
            <div className="form-group">
              <div className="card__add">
                <input
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                  name="taskName"
                  onChange={(e) => handleOnChange(e)}
                  value={task.values.taskName}
                />
                <button id="addItem" type="button" onClick={addTask}>
                  <i className="fa fa-plus" />
                </button>
              </div>
              <span className="text-danger">{task.errors.taskName}</span>
            </div>
            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                <span className="text-info">To do tasks</span>
                {renderToDoTask()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
                <span className="text-info">Completed tasks</span>
                {renderCompletedTask()}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
