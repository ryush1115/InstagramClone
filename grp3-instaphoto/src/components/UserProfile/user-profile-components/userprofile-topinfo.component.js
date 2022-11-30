import React, { useState, Fragment, useEffect, useRef } from "react";
import '../userprofile.css';
// import {getPosts} from '../api/mock_api';

const UserProfile_TopInfo = () => {
  const[postCount, setPostCount] = useState(0);

  return (
    <>
        <div className="user-profile-header">
            <div className="user-profile-header-image">
                <img className={"user-profile-header-image"} src="https://i.ibb.co/bgWdsVT/grp3.png" alt=""/>
            </div>
            <div className="user-profile-header-name">
                <h1 className="user-profile-header-name">grp3foreva</h1>
            </div>
            <div className="profile-stats">
                <ul>
                    <li><span className="profile-stat-count">39</span> posts</li>
                    <li><span className="profile-stat-count">169</span> followers</li>
                    <li><span className="profile-stat-count">667</span> following</li>
                </ul>
            </div>
        </div>
    </>
  )
}
export default UserProfile_TopInfo;
