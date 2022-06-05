import React, { useState, useEffect } from 'react';
import {loginUser} from '../axios-services'

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
              username: userName,
              password: password
          }
          console.log(user)
        await loginUser(user);
        setIsLoggedIn(localStorage.getItem("token") ? true : false)
        setUserName('');
        setPassword('');
        console.log(localStorage.getItem("token"));
    }
    const updateUserName = (event) => {
        setUserName(event.target.value)
    }
    const updatePassword = (event) => {
        setPassword(event.target.value)
    }
    return(

        <div>
        <form onSubmit={handleSubmit}>
            <input placeholder = "Login username" value = {userName} type = 'text' onChange={updateUserName} />
            <input placeholder = "Login password" value = {password} type = 'password' onChange={updatePassword}/>
            <button>Login</button>
        </form>

        </div>



)}

export default Login;