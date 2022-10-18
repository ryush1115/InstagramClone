import React, { useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { getUsers, getUser, createUser } from '../api/mock_api';

const SignupComponent=()=>{
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  // new User fields input in the form
  let newUsername;
  let newEmail;
  let newPassword;

  const handleSubmitClick = e => {
    e.preventDefault();

    // validate email format
    if (!validateEmail(email)) {
      setError('Invalid Email'); 
      console.log('Invalid Email');
    }

    // check if password
    if (password.length < 8) {
      setError('Password must be at least 8 chars long');
      console.log('Password must be at least 8 chars long');
    }

    // check of password and confirm password are identical
    if (confirmPassword !== password) {
      setError('Passwords entered do not match!');
      console.log('Password must be at least 8 chars long');
    }

    //TO DO: check if email is not in the database
    //TO DO: check if username is not in the database

    // if no error, then navigate to userProfile

    console.log("error" + error);
    console.log(username, email, password, confirmPassword);
    console.log(error);

    if (!error===null) {
      console.log(error);
      // if all validated, then add user to the json database
      // Post a User object to the database with email and password
      // call createUser

      // navigate to the home page
      navigate('/userprofile');
    };
  }

  const validateEmail = (email) => {
    const regex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return regex.test(String(email).toLowerCase());
    };

  const handleCreateNewStudent = async(e) => {
    // stop default behavior to avoid reloading the page
    e.preventDefault();
  
    // create new User variable
    const newUser = {username: newUsername, email: newEmail, password: newPassword, profilePicture:"",follow:[]};

    // send POST request to create new User
    const newStoredUser = await createUser(newUser);

    console.log("New Student Created");

    /*
    "email": "Webster2@hotmail.com",
        "username": "Elmer.Weissnat10",
        "password": "F2KC9R__6fRb8xI",
        "profilePicture": "http://loremflickr.com/640/480",
        "follow": ["Frederic.Strosin5"],
        "id": "1"
     */
  }  

  // how to call a synchronous (handle creation) and asynchronous function (create new student), based on the same click event?


  const navigateToLogin = () => {
    navigate('/sign-in');
  };

    return (
      <form className = "auth-inner">
        <div className="header">
            <h3>Welcome to Instaphoto&nbsp;</h3>
            <img src={require('../images/logo.PNG')} alt="logo" />
        </div>
        <br></br>
        <div className = "login-and-password">
            <h3> Signup</h3>
        </div>
        <div className="login-and-password">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="login-and-password">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="login-and-password">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password (more than 8 characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="login-and-password">
          <label>Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <br></br>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>
            Finish
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in" onClick={navigateToLogin}>sign in?</a>
        </p>
      </form>
    )
}

export default SignupComponent;