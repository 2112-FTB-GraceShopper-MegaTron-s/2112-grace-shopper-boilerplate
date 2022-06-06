import React, { useState } from 'react';
// import useStyles from './styles';

const Register = (props) => {
    const { registerUser } = props;
    //const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
              username: userName,
              password: password,
              email: email
          }
          console.log(user)
        await registerUser(user);
        setUserName('');
        setPassword('');
        setEmail('');
        console.log(localStorage.getItem("token"));
    }
    const updateUserName = (event) => {
        setUserName(event.target.value)
    }
    const updatePassword = (event) => {
        setPassword(event.target.value)
    }
    const updateEmail = (event) => {
        setEmail (event.target.value)
    }
    return(
        <div>
        <form onSubmit={handleSubmit}>
            <input placeholder = "Register username" value = {userName} type = 'text' onChange={updateUserName} />
            <input placeholder = "Register password" value = {password} type = 'password' onChange={updatePassword}/>
            <input placeholder = "Register email" value = {email} type = 'text' onChange={updateEmail}/>            
            <button>Register</button>
        </form>
        </div>
)}
export default Register;