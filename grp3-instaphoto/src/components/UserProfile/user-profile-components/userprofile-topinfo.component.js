import React, { useState, Fragment, useEffect, useRef } from "react";
import '../userprofile.css';
import {getTokenUser, isMyFollowing, following, cancelFollowing} from "../../../api/mock_api";

const UserProfile_TopInfo = (props) => {
  const[postCount, setPostCount] = useState(0);
  const[followersCount, setFollowersCount] = useState(0);
  const[followingCount, setFollowingCount] = useState(0);
  const[userName, setUserName] = useState("");
  const[profilePic, setProfilePic] = useState("");

  const [otherPage, setOtherPage] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
      if (!!props.user) {
          setOtherPage(true);
          isMyFollowing(props.user.data.username).then((isFollowing) => {
              setIsFollowing(isFollowing);
          });
          console.log("user given");
          console.log(props.user);
          const user = props.user.data;
          setPostCount(user.posts.length);
          setFollowersCount(user.followers.length);
          setFollowingCount(user.following.length);
          setUserName(user.username);
          if (!!user.profilePicture) {
              setProfilePic(user.profilePicture);
          } else {
              setProfilePic("https://www.w3schools.com/howto/img_avatar.png");
          }
      } else {
          getTokenUser().then((user) => {
              if (user.status === 401) {
                    console.log("not signed in");
                    sessionStorage.removeItem("token");
                    window.location.href = "/sign-in";
              } else {
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
                  if (!!userdata.profilePicture) {
                      console.log("profile pic exists");
                      console.log(userdata.profilePicture);
                      setProfilePic(userdata.profilePicture);
                  } else {
                      console.log("no profile pic");
                        setProfilePic("https://www.w3schools.com/howto/img_avatar.png");
                  }
              }
          });
      }
  }, []);


  if (otherPage) {
      return (
          <>
              <div className="user-profile-header">
                  <div className="user-profile-header-image">
                      <img className={"user-profile-header-image"} src={profilePic} alt=""/>
                  </div>
                  <div className="user-profile-header-name">
                      <h1 className="user-profile-header-name">{userName}</h1>
                  </div>
                  <div className={"follow-button"}>
                      {isFollowing ? <button className={"user-profile-header-button"} onClick={() => {
                          cancelFollowing(props.user.data.username).then((res) => {
                              setIsFollowing(false);
                          });
                      }}>Unfollow</button> : <button className={"user-profile-header-button"} onClick={() => {
                          following(props.user.data.username).then((res) => {
                              setIsFollowing(true);
                          });
                      }}>Follow</button>}
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
  } else {
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
}
export default UserProfile_TopInfo;
