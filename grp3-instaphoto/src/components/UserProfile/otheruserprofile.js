import React, { useState, useEffect } from "react";
import './userprofile.css';
import Sidebar from '../sidebar.component'
import UserProfile_TopInfo from './user-profile-components/userprofile-topinfo.component'
import UserProfile_Gallery from './user-profile-components/userprofile-gallery.component'
import {getUser} from "../../api/mock_api";
import {useParams} from "react-router-dom";

// TODO: Add a big "follow" / "unfollow" button to the user bio below their info
export default function OtherUserProfile(props) {

    const userID = useParams().id;
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser(userID).then((userdata) => {
            if (userdata.status === 404) {
                console.log("user not found");
            } else {
                setUser(userdata.data);
            }
        });
    }, []);

    // checks if logged in
    if (sessionStorage.getItem("token")) {
        // checks if visiting own page or other page
        console.log(userID);
        // check if the user exists
        if (user == null) {
            console.log("user not found");
            // user not found
            return (
                <>
                    <h1>User not found!</h1>
                </>
            )
        } else {
            console.log("user found");
            // user exists
            return (
                <>
                    <Sidebar />
                    <UserProfile_TopInfo user={user}/>
                    <UserProfile_Gallery user={user}/>
                </>
            )
        }
    } else {
        console.log("not signed in");
        window.location.href = "/sign-in";
    }
};
