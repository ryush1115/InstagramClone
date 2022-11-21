import React, { useState, Fragment, useEffect, useRef } from "react";
import '../userprofile.css';
// import {getPosts} from '../api/mock_api';

const UserProfile_TopInfo = () => {
  const[postCount, setPostCount] = useState(0);

  return (
    <Fragment>
            <header>
                <div className="container">
                    <div className="profile">
                        <div className="profile-image">
                            <img src="https://i.ibb.co/bgWdsVT/grp3.png" alt=""/>
                        </div>
                        <div className="profile-user-settings">
                            <h1 className="profile-user-name">grp3foreva</h1>
                        </div>
                        <div className="profile-stats">
                            <ul>
                                <li><span className="profile-stat-count">{postCount}</span> posts</li>
                                <li><span className="profile-stat-count">169</span> followers</li>
                                <li><span className="profile-stat-count">667</span> following</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
    </Fragment>
  )
}
export default UserProfile_TopInfo;
