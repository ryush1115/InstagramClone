/* eslint-disable no-template-curly-in-string */
import React, { useState, Fragment, useEffect, useRef } from "react";
import './acitivtyfeed-components/activityfeed.css';
import '../UserProfile/userprofile.css';

import AddPost from "./acitivtyfeed-components/AddPost";

import ActivityFeedUsername from "./acitivtyfeed-components/Activity-Feed-Username";
import Sidebar from './../sidebar.component'
import MainFeed from "./acitivtyfeed-components/MainFeed";

export default function ActivityFeedComponent(props) {
  const[, setNewComment] = useState(null);
  const[, setDeletedPost] = useState(null);
  const[, setIncrementLike] = useState(null);

  return (
    <>
      <MainFeed />
    </>
  )
};