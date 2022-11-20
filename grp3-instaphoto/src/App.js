import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login_Signup/login.component'
import SignUp from './components/Login_Signup/signup.component'
import Userprofile from './components/UserProfile/userprofile'
import ActivityFeed from './components/activityfeed.component'
import FriendSuggestion from './components/FriendSuggestion-page/FriendSuggestion.component'
import FollowingList from './components/FollowingList-page/FollowingList'
import DragDrop from './components/dragdrop.component'
import HomeNavbar from "./components-2/navbar/homenavbar";
import EditPost from "./components-2/edit-post/edit-post";


// import Userpic from './components/test'
import Gallery from './components/UserProfile/user-profile-components/userprofile-gallery.component'
import Sidebar from './components/sidebar.component'


function App() {
  return (
    <Router>
      <div className="App">
        <HomeNavbar />
        {/* <div className="auth-wrapper"> */}
          {/* <div className="auth-inner"> */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/user-profile" element={<Userprofile />} />
          <Route path="/activity-feed" element={<ActivityFeed />} />
          <Route path = "/friendsuggestion" element = {<FriendSuggestion />}/>
          {/* <Route path="/user-pic" element={<Userpic />} />                */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/userprofile" element={<Userprofile userName={"grp3foreva"} />} />
          <Route path="/dragdrop" element={<DragDrop />} />
          <Route path="/followinglist" element={<FollowingList />} />
          <Route path={"/edit-post/:id"} element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App
