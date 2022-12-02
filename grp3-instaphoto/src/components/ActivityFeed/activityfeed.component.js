/* eslint-disable no-template-curly-in-string */
import React, { useState, Fragment, useEffect, useRef } from "react";
import './activityfeed-components/activityfeed.css';
import '../UserProfile/userprofile.css';

import AddPost from "./activityfeed-components/AddPost";

import ActivityFeedUsername from "./activityfeed-components/Activity-Feed-Username";
import Sidebar from './../sidebar.component'
import MainFeed from "./activityfeed-components/MainFeed";

export default function ActivityFeedComponent(props) {
  const[, setNewComment] = useState(null);
  const[, setDeletedPost] = useState(null);
  const[, setIncrementLike] = useState(null);

  return (
    <>
      <MainFeed alt=""/>
    </>
  )
};