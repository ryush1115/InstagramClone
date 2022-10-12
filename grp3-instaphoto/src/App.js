import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Userprofile from './components/userprofile.component'
<<<<<<< Updated upstream
=======
import ActivityFeed from './components/activityfeed.component'
import ActivityFeedTempComponent from './components/activityfeed-temporary.component'
import FriendBar from './components/friendbar.component'
import FriendSuggestion from './components/FriendSuggestion.component'


>>>>>>> Stashed changes
// import Userpic from './components/test'


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
                  <Link className="nav-link" to={'/user-profile'}>
                    User Profile
                  </Link>
                </li>
<<<<<<< Updated upstream
=======
                <li className="nav-item">
                  <Link className="nav-link" to={'/activity-feed'}>
                    Activity Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/activity-feed-temp'}>
                    Create Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/friendbar'}>
                    FriendBar
                  </Link>
                </li>
                <li className = "nav-item">
                  <Link className = "nav-link" to={'/FriendSuggestion'}>
                    Friend Suggestion
                  </Link>
                </li>

                
 

>>>>>>> Stashed changes
                {/* <li className="nav-item">
                  <Link className="nav-link" to={'/user-pic'}>
                    Test
                  </Link>
                </li> */}
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
<<<<<<< Updated upstream
              <Route path="/user-profile" element={<Userprofile />} />   
              {/* <Route path="/user-pic" element={<Userpic />} />               */}
=======
              <Route path="/user-profile" element={<Userprofile />} />
              <Route path="/activity-feed" element={<ActivityFeed />} />   
              <Route path = "/activity-feed-temp" element = {<ActivityFeedTempComponent />}/>
              <Route path = "/friendbar" element = {<FriendBar />}/>
              <Route path = "/FriendSuggestion" element = {<FriendSuggestion />}/>

              {/* <Route path="/user-pic" element={<Userpic />} />                */}
>>>>>>> Stashed changes
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App