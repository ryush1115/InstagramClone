/* eslint-disable no-template-curly-in-string */
import React, { useState, Fragment, useEffect, useRef } from "react";
import './activityfeed-components/activityfeed.css';
import '../UserProfile/userprofile.css';
import MainFeed from "./activityfeed-components/MainFeed";

export default function ActivityFeedComponent(props) {

  if (sessionStorage.getItem("token")) {
    return (
        <>
          <MainFeed alt=""/>
        </>
    )
  } else {
    window.location.href = "/sign-in";
  }
};