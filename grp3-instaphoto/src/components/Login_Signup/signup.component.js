import React, { useState } from "react";
import {useNavigate } from 'react-router-dom';
import './login_signup.css';
import Form from './login_signup-components/form.component'
import Form_Submit from './login_signup-components/form-submit.component'
import Form_Welcome from './login_signup-components/form-welcome.component'

const SignupComponent = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigateToLogin = () => {
    navigate('/sign-in');
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log("Printing test output: ");
    console.log(username, email, password, confirmPassword);

    // validate email format
    if (!validateEmail(email)) {
      console.log('Invalid Email');
    }

    // check if password is the right length
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
    // console.log(username, email, password, confirmPassword);

    if (validateEmail(email) && password.length >= 8 && confirmPassword === password) {
      // if all validated, then add user to the json database
      // Post a User object to the database with email and password
      // call createUser
      //handleCreateNewStudent(e);

      // navigate to the home page
      navigate('/userprofile');
    };
  }

  const validateEmail = (email) => {
    const regex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(String(email).toLowerCase());
  };
 
  /*
  const handleCreateNewStudent = async (e) => {
    // stop default behavior to avoid reloading the page
    e.preventDefault();
    // create new User variable
    const newUser = { username: newUsername, email: newEmail, password: newPassword, profilePicture: "", follow: [] };

    // send POST request to create new User
    const newStoredUser = await createUser(newUser);
    console.log("New Student Created");
  } 
  */

  return (
    <form className="auth-inner">
      <Form_Welcome/>
      <h3> Signup</h3>
      <Form label = "Username" type = "text" placeholder = "Username" value = {username} onChange={e => setUsername(e.target.value)}/>
      <Form label = "Email" type = "email" placeholder = "Email" value = {email} onChange={e => setEmail(e.target.value)}/>
      <Form label = "Password" type = "password" placeholder = "Password (more than 8 characters)" value = {password} onChange={e => setPassword(e.target.value)}/>
      <Form label = "Re-enter Password" type = "password" placeholder = "Re-enter password" value = {confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
      <Form_Submit label = "Finish" onClick={handleSubmitClick}/>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in" onClick={navigateToLogin}>sign in?</a>
      </p>
    </form>
  )
}

export default SignupComponent;