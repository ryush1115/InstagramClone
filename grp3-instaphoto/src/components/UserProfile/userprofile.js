import React, { useState, useEffect } from "react";
import './userprofile.css';
import Sidebar from '../sidebar.component'
import Dragdrop from '../dragdrop.component'
import UserProfile_TopInfo from './user-profile-components/userprofile-topinfo.component'
import UserProfile_Gallery from './user-profile-components/userprofile-gallery.component'
import {checkJWT} from "../../api/mock_api";

export default function Userprofile(props) {

    const [create, setCreate] = useState('default');
    const signedIn = localStorage.getItem("loginState");

    if (!signedIn) {
        console.log("not signed in");
        console.log(signedIn);
        window.location.href = "/sign-in";
    }

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
};
