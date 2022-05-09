import React from 'react'
import { Redirect } from 'react-router-dom';

export default function Profile() {
    //get user data from localStorage
    const userData =JSON.parse(localStorage.getItem('userAccount')) ;
   // console.log(userData)
    if(userData){
        return (
            <div>Profile</div>
          )
    }else{
         alert('You need to login first!');
       return <Redirect to='/login'/>
    }
}
