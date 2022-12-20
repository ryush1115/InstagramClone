import React, { useState, Fragment, useEffect, useRef } from "react";
import '../login_signup.css';
// import {getPosts} from '../api/mock_api';

const Form = (props) => {
  
  return (
    <Fragment>
    <div className="login-and-password">
          <label>{props.label}</label>
          <input
            id = {props.id}
            type={props.type}
            className="form-control"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
          />
    </div>
    </Fragment>
  )
}
export default Form;
