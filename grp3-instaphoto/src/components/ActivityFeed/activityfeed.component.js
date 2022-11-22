/* eslint-disable no-template-curly-in-string */
import React, { useState, Fragment, useEffect, useRef } from "react";
import './activityfeed.css';
import '../UserProfile/userprofile.css';

import AddPost from "./AddPost";

import ActivityFeedUsername from "./Activity-Feed-Username";
import Sidebar from './../sidebar.component'

export default function ActivityFeedComponent(props) {
  const[, setNewComment] = useState(null);
  const[, setDeletedPost] = useState(null);
  const[, setIncrementLike] = useState(null);
  const [roster, setRoster] = useState([]);
  const [create, setCreate] = useState('default');

  return (
    <>
      <Sidebar create = {create} setCreate = {setCreate}/>
      <header>
        <div className="container" data-testid = "testcc">
          <div className="profile">
            <div className="profile-image">
              <img alt="" />
              {/* <img src={require('../images/grp3.PNG')} alt=""/> */}
            </div>
            <ActivityFeedUsername username={"grp3foreva"}/>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="feed">
            <div className="feedWrapper">
              <AddPost />
            </div>
          </div>
        </div>
      </main>
    </>
  )
};