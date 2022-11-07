import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Userprofile from './components/userprofile.component'
import ActivityFeed from './components/activityfeed.component'
import CreatePost from './components/createpost.component'
import FriendSuggestion from './components/FriendSuggestion.component'
import FollowingList from './components/FollowingList'
import DragDrop from './components/dragdrop.component'
import HomeNavbar from "./components-2/navbar/homenavbar";
import EditPost from "./components-2/edit-post/edit-post";


// import Userpic from './components/test'
import Gallery from './components/gallery.component'
import Sidebar from './components/sidebar.component'
import Createpost from './components/createpost.component'
import Postpage from "./components-2/postpage/postpage";


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
          <Route path="/createpost" element={<Createpost />} />
          <Route path="/dragdrop" element={<DragDrop />} />
          <Route path="/followinglist" element={<FollowingList />} />
          <Route path={"/post/:id"} element={<Postpage />} />
          <Route path={"/edit-post/:id"} element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App
