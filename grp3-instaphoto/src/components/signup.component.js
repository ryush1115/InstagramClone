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
  const [connected, setConnected] = useState(false);

  // new User fields input in the form
  let newUsername;
  let newEmail;
  let newPassword;
  let newConfirmPassword;

  const handleOnChange = (e) => {
    // update the fields inside event handlers

    if (e.target.name === 'username') {
      newUsername = e.target.value;
      //setUsername(e.target.value)
    }
    if (e.target.name === 'email') {
      newEmail = e.target.value;
      //setEmail(e.target.value)

    }
    if (e.target.name === 'password') {
      newPassword = e.target.value;
      //setPassword(e.target.value)

    }
    if (e.target.name === 'confirmPassword') {
      newConfirmPassword = e.target.value;
      //setConfirmPassword(e.target.value)
    }
    //setUsername(e.target.value)
    //setEmail(e.target.value)

  }

  const handleSubmitClickAndCreateUser = (e) => {
    handleSubmitClick(e);
  
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log("test output!!");
    console.log("password length: " + password.length);
    console.log(username, email, password, confirmPassword);

    // validate email format
    if (!validateEmail(email)) {
      console.log('Invalid Email');
    }

    // check if password
    if (password.length < 8) {
      console.log('Password must be at least 8 chars long');
    }

    // check of password and confirm password are identical
    if (confirmPassword !== password) {
      console.log('Passwords entered do not match!');
    }

    //TO DO: check if email is not in the database
    //TO DO: check if username is not in the database
    // if no error, then navigate to userProfile
    console.log(username, email, password, confirmPassword);
    

    if (validateEmail(email) && password.length >= 8) {
      // if all validated, then add user to the json database
      // Post a User object to the database with email and password
      // call createUser
      handleCreateNewStudent(e);

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

  const navigateToUserProfile = () => {
    navigate('/userprofile');
  };

  const navigateToLogin = () => {
    navigate('/sign-in');
  };

  // onClick={handleCreateNewStudent}
  // onSubmit={handleCreateNewStudent}
    return (
      <form className = "auth-inner" onSubmit={handleSubmitClick}>
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
            name="username"
            //value={username}
            onChange={handleOnChange}
          />
        </div>
        <div className="login-and-password">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Email" 
            name="email"
            //value={email}
            onChange={handleOnChange}
            />
        </div>
        <div className="login-and-password">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password (more than 8 characters)"
            //value={password}
            onChange={handleOnChange}
          />
        </div>
        <div className="login-and-password">
          <label>Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter password"
            name="confirmPassword"
            //value={confirmPassword}
            onChange={handleOnChange}
          />
        </div>
        <br></br>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
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