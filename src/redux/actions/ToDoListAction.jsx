import { GET_TASK_API } from "../constants/ToDoListConstants";
import Axios from "axios";
export const getTaskListAPI = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await Axios({
        method: "GET",
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      });
      if (status === 200) {
        dispatch({
          type: GET_TASK_API,
          payload: data,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }

    // const promise = Axios({
    //   method: "GET",
    //   url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
    // });
    // //console.log(promise);
    // promise.then((res) => {
    //   dispatch({
    //     type: GET_TASK_API,
    //     payload: res.data,
    //   });
    // });
    // promise.catch((err) => console.log(err.response.data));
  };
};
export const addTaskAPI = (task) => {
  return async (dispatch) => {
    try {
      const { data, status } = await Axios({
        method: "POST",
        url: `http://svcy.myclass.vn/api/ToDoList/AddTask`,
        data: task
      });
      if (status === 200) {
        dispatch(getTaskListAPI());
      }
    } catch (err) {
      console.log(err.response.data);
    }
    // promise.then((res) => {
    //   dispatch(getTaskListAPI());
    // });
    // promise.catch((err) => console.log(err.response.data));
  };
};
export const deleteTaskAPI = (taskName) => {
  return (dispatch) => {
    const promise = Axios({
      method: "DELETE",
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
    });
    promise.then((res) => {
      console.log(res.data);
      dispatch(getTaskListAPI());
    });
    promise.catch((err) => console.log(err.response.data));
  };
};
export const rejectTaskAPI = (taskName) => {
  return (dispatch) => {
    const promise = Axios({
      method: "PUT",
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
    });
    promise.then((res) => {
      console.log(res.data);
      dispatch(getTaskListAPI());
    });
    promise.catch((err) => console.log(err.response.data));
  };
};
export const completeTaskAPI = (taskName) => {
  return (dispatch) => {
    const promise = Axios({
      method: "PUT",
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
    });
    promise.then((res) => {
      console.log(res.data);
      dispatch(getTaskListAPI());
    });
    promise.catch((err) => console.log(err.response.data));
  };
};
