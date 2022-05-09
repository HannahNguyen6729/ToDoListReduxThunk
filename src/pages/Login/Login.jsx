import React, { useState } from "react";
import { Prompt } from "react-router-dom";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    password: "",
    status: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userLogin.userName === "hannah" && userLogin.password === "xxx") {
      //go back to the previous page
      props.history.goBack();

      //change the current page to the target page
      //props.history.push('/contact');

      //change the content of the path matched
      //props.history.replace('/contact');
      localStorage.setItem("userAccount", JSON.stringify(userLogin));
    } else {
      alert(" login failed");
      return;
    }
  };
  const handleLogin = (e) => {
    let { name, value } = e.target;
    let newUserLogin = {
      ...userLogin,
      [name]: value,
    };
    //dang nhap lieu 1 nua, user muon roi di, can hien thi hop thoai neu user muon di,
    let flag = true;
    for (let key in newUserLogin) {
        if(key !== 'status'){
            if(newUserLogin[key].trim()===''){
                flag = false;
            }
        }
    }
   if(!flag){
       //khong cho di neu co whitespace
    newUserLogin.status= true;
   }else{
       //cho di neu khong co whitespace
    newUserLogin.status= false;
   }
    setUserLogin(newUserLogin);
  };
  console.log(userLogin);
  return (
    <form onSubmit={handleSubmit} className="m-5 container">
      <p> User name</p>
      <input
        type="text"
        name="userName"
        className="form-control"
        onChange={handleLogin}
      />
      <br />
      <p>Password</p>
      <input
        type="text"
        name="password"
        className="form-control"
        onChange={handleLogin}
      />
      <br />
      <button className="btn btn-primary">Login</button>
      <br />
      <Prompt
        when={userLogin.status}
        message={(location) => {
          //console.log(location);
          return "ban co chac muon roi di?";
        }}
      />
    </form>
  );
}
