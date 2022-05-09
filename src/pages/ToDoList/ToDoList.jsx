import React, { Component } from "react";
import "./style.css";
import Axios from "axios";

export default class ToDoListRFC extends Component {
  showDate = () => {
    let a = new Date();
    return a.getFullYear();
  };
  state={
    taskList:[],
    values: {taskName:''},
    errors: {taskName:''}
  }
  getTaskList = () => {
    const promise = Axios({
      method: "GET",
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
    });
    promise.then((res) => {
      this.setState({
        ...this.state,
        taskList: res.data
      })
    });
    promise.catch((err) => console.log(err.response.data));
  };
  componentDidMount(){
    this.getTaskList()
  };
  renderToDoTask=() => {
    return this.state.taskList.filter(item => !item.status).map((task, index) => (
      <li key={index}>
        <span>{task.taskName}</span>
        <div className="buttons">
          <button type='button' className="remove" onClick= {() => this.handleDeleteTask(task.taskName)}>
            <i className="fa fa-trash-alt" />
          </button>
          <button type='button' className="complete" onClick={()=>{ this.handleCompleteTask(task.taskName)}}>
            <i className="fa fa-check-circle" />
          </button>
        </div>
      </li>
    ))
  }
  renderCompletedTask =()=>{
    return this.state.taskList.filter( item => item.status).map((task, index) =>(
      <li key={index}>
        <span>{task.taskName}</span>
        <div className="buttons">
          <button type='button' className="remove" onClick= {() => this.handleDeleteTask(task.taskName)}>
            <i className="fa fa-trash-alt" />
          </button>
          <button type='button' className="complete" onClick={() =>this.handleUndoTask(task.taskName)}>
            <i className="fa fa-undo text-success" />
          </button>
        </div>
      </li>
    ))
  }
  handleOnChange=(e)=>{
    let {name, value} = e.target;
    let newValues = {...this.state.values, [name]: value};
    let newErrors = {...this.state.errors};

    //both number and letter
    let regexString = /^[A-Z a-z 0-9]+$/i;

    if(!regexString.test(value) || value.trim() ===''){
      newErrors[name] = name + ` is in valid`;
    }else{
      newErrors[name] = '';
    };

    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors
    })
  }
  handleAddTask = (e) => {
    e.preventDefault()
    if(this.state.values.taskName !=='' && this.state.errors.taskName ===''){
      const promise = Axios({
        method: 'POST',
        url:`http://svcy.myclass.vn/api/ToDoList/AddTask`,
        data: this.state.values
      })
      promise.then(res => {
        console.log(res.data)
        this.getTaskList()
        this.setState({ 
          ...this.state, 
          values: {taskName: ''}
        })
      })
      promise.catch(err => console.log(err.response.data))
    }else{
      alert('invalid data')
      return;
    }
  }
  handleDeleteTask=(taskName)=>{
    const promise = Axios({
      method: 'DELETE',
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`
    });
    promise.then(res => {
      console.log(res.data);
      this.getTaskList();
    });
    promise.catch(err => console.log(err.response.data))
  }
  handleCompleteTask = (taskName)=>{
    const promise = Axios({
      method: 'PUT',
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
    });
    promise.then(res => {
      console.log(res.data);
      this.getTaskList();
    });
    promise.catch(err => console.log(err.response.data));
  }
  handleUndoTask = (taskName) => {
    const promise = Axios({
      method: 'PUT',
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`
    });
    promise.then(res => {
      console.log(res.data);
      this.getTaskList();
    });
    promise.catch(err => console.log(err.response.data));
  }
  render() {
    return (
      <div className="card">
        <div className="card__header">
          <img src={require("./img/bg.png")} alt="background img" />
        </div>
        <form onSubmit={(e) => this.handleAddTask(e)}>
          <div className="card__body">
            <div className="card__content">
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>{this.showDate()}</p>
              </div>
              <div className="form-group">
                <div className="card__add">
                  <input
                    id="newTask"
                    type="text"
                    placeholder="Enter an activity..."
                    name="taskName"
                    value= {this.state.values.taskName}
                    onChange={this.handleOnChange}
                  />
                  <button id="addItem" type="button" onClick={this.handleAddTask}>
                    <i className="fa fa-plus" />
                  </button>
                </div>
                <span className="text-danger">{this.state.errors.taskName}</span>
              </div>
              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  <span className="text-info">To do tasks</span>
                  {this.renderToDoTask()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  <span className="text-info">Completed tasks</span>
                  {this.renderCompletedTask()}
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
