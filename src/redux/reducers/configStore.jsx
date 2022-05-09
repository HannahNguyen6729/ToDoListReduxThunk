import {applyMiddleware, combineReducers} from 'redux';
import {createStore} from 'redux';
import {toDoListReducer} from './ToDoListReducer'
import reduxThunk from 'redux-thunk';
const rootReducer = combineReducers({
    //declare reducer here
    toDoListReducer
});

//const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(rootReducer, applyMiddleware(reduxThunk))
export default store;
