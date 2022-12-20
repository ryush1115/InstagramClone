import React, {useLayoutEffect, useState} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login_Signup/login.component'
import SignUp from './components/Login_Signup/signup.component'
import Userprofile from './components/UserProfile/userprofile'
import ActivityFeed from './components/ActivityFeed/activityfeed.component'
import FriendSuggestion from './components/FriendSuggestion-page/FriendSuggestion.component'
import FollowingList from './components/FollowingList-page/FollowingList'
import UserList from './components/AllUsers/AllUsers'
import DragDrop from './components/dragdrop.component'
import HomeNavbar from "./components/navbar/homenavbar";
import EditPost from "./components/EditPost/edit-post/edit-post";


// import Userpic from './components/test'
import Gallery from './components/UserProfile/user-profile-components/userprofile-gallery.component'
import Sidebar from './components/sidebar.component'
import OtherUserProfile from "./components/UserProfile/otheruserprofile";

export default function App() {
  const [loginState, setLoginState] = useState(false);

  localStorage.setItem("loginState", `${loginState}`);

  useLayoutEffect(() => {
    if (window.sessionStorage.token) {
      setLoginState(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <HomeNavbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/user-profile" element={<Userprofile />} />
          <Route path={"/user-profile/:id"} element={<OtherUserProfile />} />
          <Route path={"/user/:username"} element={<OtherUserProfile />} />
          <Route path="/activity-feed" element={<ActivityFeed />} />
          <Route path = "/friendsuggestion" element = {<FriendSuggestion />}/>
          <Route path = "/allUsers" element = {<UserList />}/>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/dragdrop" element={<DragDrop />} />
          <Route path="/followinglist" element={<FollowingList />} />
          <Route path={"/edit-post/:id"} element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  )
};