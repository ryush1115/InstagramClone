import React, { useState, Fragment, useEffect, useRef } from "react";
import '../login_signup.css';
// import {getPosts} from '../api/mock_api';

const Form_Submit = (props) => {
  
  return (
    <Fragment>
    <div className="d-grid">
        <button type="submit" className="btn btn-primary" onClick = {props.onClick}>
            {props.label}
        </button>
    </div>
    <br></br>
    </Fragment>
  )
}
export default Form_Submit;
