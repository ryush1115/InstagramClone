import React, { useState, useEffect } from "react";
import './userprofile.css';
import Sidebar from '../sidebar.component'
import UserProfile_TopInfo from './user-profile-components/userprofile-topinfo.component'
import UserProfile_Gallery from './user-profile-components/userprofile-gallery.component'
import {getUser, getUserByName} from "../../api/mock_api";
import {useParams} from "react-router-dom";

export default function OtherUserProfile(props) {

    const userID = useParams().id;
    const userName = useParams().username;
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userID) {
            getUser(userID).then((userdata) => {
                if (userdata.status === 404) {
                    console.log("user not found");
                } else {
                    setUser(userdata.data);
                }
            });
        } else if (userName) {
            getUserByName(userName).then((userdata) => {
                if (!!userdata) {
                    console.log("user found");
                    console.log(userdata);
                    if (userdata.status === 404) {
                        console.log("user not found");
                    } else {
                        setUser(userdata.data);
                    }
                }
            });
        }
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
                    <Sidebar />
                    <div className={"nothing-found"}>
                        <h1>User not found</h1>
                    </div>
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
