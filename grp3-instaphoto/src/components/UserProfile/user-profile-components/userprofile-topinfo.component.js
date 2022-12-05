import React, { useState, Fragment, useEffect, useRef } from "react";
import '../userprofile.css';
// import {getPosts} from '../api/mock_api';
import {getTokenUser} from "../../../api/mock_api";

const UserProfile_TopInfo = () => {
  const[postCount, setPostCount] = useState(0);
  const[followersCount, setFollowersCount] = useState(0);
  const[followingCount, setFollowingCount] = useState(0);
  const[userName, setUserName] = useState("");
  const[profilePic, setProfilePic] = useState("");

  useEffect(() => {
    getTokenUser().then((user) => {
        const userdata = user.data;
        try {
            setPostCount(userdata.posts.length);
        } catch (err) {
            setPostCount(0);
        }
        try {
            setFollowersCount(userdata.followers.length);
        } catch (err) {
            setFollowersCount(0);
        }
        try {
            setFollowingCount(userdata.following.length);
        } catch (err) {
            setFollowingCount(0);
        }
        setUserName(userdata.username);
        console.log(userdata);
        setProfilePic(userdata.profilePicture);
    });
  }, []);

  return (
    <>
        <div className="user-profile-header">
            <div className="user-profile-header-image">
                <img className={"user-profile-header-image"} src={profilePic} alt=""/>
            </div>
            <div className="user-profile-header-name">
                <h1 className="user-profile-header-name">{userName}</h1>
            </div>
            <div className="profile-stats">
                <ul>
                    <li><span className="profile-stat-count">{postCount}</span> posts</li>
                    <li><span className="profile-stat-count">{followersCount}</span> followers</li>
                    <li><span className="profile-stat-count">{followingCount}</span> following</li>
                </ul>
            </div>
        </div>
    </>
  )
}
export default UserProfile_TopInfo;
