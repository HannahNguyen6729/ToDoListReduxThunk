import { GET_TASK_API } from "../constants/ToDoListConstants";

const initialState={
    taskList: [],
};
export const toDoListReducer= (state=initialState,action) => {
    switch(action.type) {
        case GET_TASK_API:{
           // console.log(action.payload)
           state.taskList= action.payload;
            return {...state}
        }
        default:
            return {...state}
    }
}