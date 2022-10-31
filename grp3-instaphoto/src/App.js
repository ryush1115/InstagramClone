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

// import Userpic from './components/test'
import Gallery from './components/gallery.component'
import Sidebar from './components/sidebar.component'
import Createpost from './components/createpost.component'


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Instaphoto
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/userprofile'}>
                    User Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/activity-feed'}>
                    Activity Feed
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to={'/friendbar'}>
                    FriendBar
                  </Link>
                </li> */}
                <li className = "nav-item">
                  <Link className = "nav-link" to={'/FriendSuggestion'}>
                    Friend Suggestion
                  </Link>
                </li>
                { <li className = "createpost">
                  <Link className = "nav-link" to={'/dragdrop'}>
                    Create Post
                  </Link>
                </li>}
                <li className = "nav-item">
                  <Link className = "nav-link" to={'/FollowingList'}>
                    Following List
                  </Link>
                </li>


              </ul>
            </div>
          </div>
        </nav>
        {/* <div className="auth-wrapper"> */}
        <div>
          <div>
          {/* <div className="auth-inner"> */}
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/user-profile" element={<Userprofile />} />
              <Route path="/activity-feed" element={<ActivityFeed />} />
              <Route path = "/FriendSuggestion" element = {<FriendSuggestion />}/>
              {/* <Route path="/user-pic" element={<Userpic />} />                */}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/sidebar" element={<Sidebar />} />
              <Route path="/userprofile" element={<Userprofile />} />
              <Route path="/createpost" element={<Createpost />} />
              <Route path="/dragdrop" element={<DragDrop />} />
              <Route path="/FollowingList" element={<FollowingList />} />


            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App
