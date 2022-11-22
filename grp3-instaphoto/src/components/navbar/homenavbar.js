import React from 'react';
import {Link} from "react-router-dom";
import './navbar.css';

//TODO: Dynamically change navbar options based on login state
export default function HomeNavbar(props) {
    return (
        <header className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                {
                    //TODO: This should change where it sends you based on your login state.
                }
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
        </header>
    );
}
