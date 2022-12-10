import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import './navbar.css';

//TODO: Dynamically change navbar options based on login state
export default function HomeNavbar() {

    // Check for page change, and update the navbar accordingly
    const location = useLocation();
    const [loginState, setLoginState] = useState(false);

    useEffect(() => {
        if (window.sessionStorage.token) {
            setLoginState(true);
        } else {
            setLoginState(false);
        }
    }, [location]);

    if (loginState) {
        return (
            <header className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/sign-in'}>
                        Instaphoto
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/user-profile'}>
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/activity-feed'}>
                                    Activity Feed
                                </Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to={'/FriendSuggestion'}>
                                    Discover Friends
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
                            <li className={"nav-item"}>
                                <button className={"nav-link"} onClick={() => {
                                    window.sessionStorage.clear();
                                    window.location.reload();
                                }}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    } else {
        return (
            <header className="navbar navbar-expand-lg navbar-light fixed-top">
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
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}
