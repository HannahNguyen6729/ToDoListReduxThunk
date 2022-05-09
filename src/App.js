import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Home/Header/Header";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import ToDoList from "./pages/ToDoList/ToDoList";
import ToDoListRedux from "./pages/ToDoList/ToDoListRedux";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/" component={Home} />
        <Route exact path ='/login' component={Login} />
        <Route exact path= '/detail/:id' component={Detail} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/todolist' component={ToDoList} />
        <Route exact path='/todolistrfc' component={ToDoListRFC} />
        <Route exact path='/todolistredux' component={ToDoListRedux} />
        {/* Truong hop go dia chi link lung tung */}
        {/* <Route path='*' component={Home}/> */}
        <Route path='*' component={PageNotFound} />
       
      </Switch>
    </BrowserRouter>
  );
}

export default App;
