import React, { useState, useEffect } from "react";
import './userprofile.css';
import Sidebar from '../sidebar.component'
import Dragdrop from '../dragdrop.component'
import UserProfile_TopInfo from './user-profile-components/userprofile-topinfo.component'
import UserProfile_Gallery from './user-profile-components/userprofile-gallery.component'
import {getUser} from "../../api/mock_api";
import {useParams} from "react-router-dom";

export default function Userprofile(props) {

    const [create, setCreate] = useState('default');
    const signedIn = localStorage.getItem("loginState");
    const userID = useParams().id;

    // checks if logged in
    if (sessionStorage.getItem("token")) {
        // checks if visiting own page or other page
        if (window.location.pathname === "/user-profile") {
            if (create === 1){
                return (
                    <>
                        <Sidebar create = {create} setCreate = {setCreate}/>
                        <UserProfile_TopInfo/>
                        <UserProfile_Gallery />
                        <Dragdrop create = {create} setCreate = {setCreate}/>
                    </>
                )
            } else {
                return (
                    <>
                        <Sidebar create = {create} setCreate = {setCreate}/>
                        <UserProfile_TopInfo/>
                        <UserProfile_Gallery/>
                    </>
                )
            }
        }
        // if statement that checks if the window location path is of the format "/user-profile/:id"
        if (window.location.pathname.match(/^\/user-profile\/[a-fA-F0-9]+$/)) {
            // check if that user exists. otherwise, throw a 404 error and display user not found!
            // if the user exists, display the user profile page
            getUser(userID).then((user) => {
                // check if the user exists
                if (user.status === 404) {
                    // user not found
                    return (
                        <>
                            <h1>User not found!</h1>
                        </>
                    )
                } else {
                    // user exists
                    return (
                        <>
                            <Sidebar create = {create} setCreate = {setCreate}/>
                            <UserProfile_TopInfo/>
                            <UserProfile_Gallery/>
                        </>
                    )
                }
            });
        }
    } else {
        console.log("not signed in");
        console.log(signedIn);
        window.location.href = "/sign-in";
    }
};
