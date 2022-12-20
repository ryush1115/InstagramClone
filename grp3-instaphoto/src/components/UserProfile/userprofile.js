import React, { useState } from "react";
import './userprofile.css';
import Sidebar from '../sidebar.component'
import Dragdrop from '../dragdrop.component'
import UserProfile_TopInfo from './user-profile-components/userprofile-topinfo.component'
import UserProfile_Gallery from './user-profile-components/userprofile-gallery.component'

export default function Userprofile() {

    const [create, setCreate] = useState('default');

    // checks if logged in
    if (sessionStorage.getItem("token")) {
        if (create === 1) {
            return (
                <>
                    <Sidebar create = {create} setCreate = {setCreate}/>
                    <UserProfile_TopInfo />
                    <UserProfile_Gallery />
                    <Dragdrop create = {create} setCreate = {setCreate}/>
                </>
            )
        } else {
            return (
                <>
                    <Sidebar create = {create} setCreate = {setCreate}/>
                    <UserProfile_TopInfo />
                    <UserProfile_Gallery />
                </>
            )
        }
    } else {
        console.log("not signed in");
        window.location.href = "/sign-in";
    }
};
