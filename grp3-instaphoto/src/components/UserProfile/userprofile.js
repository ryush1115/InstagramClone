import React, { useState, Fragment, useCallback} from "react";
import './userprofile.css';
import Sidebar from '../sidebar.component'
import Dragdrop from '../dragdrop.component'
import UserProfile_TopInfo from './user-profile-components/userprofile-topinfo.component'
import UserProfile_Gallery from './user-profile-components/userprofile-gallery.component'

export default function Userprofile(props) {
    
    const [create, setCreate] = useState('default');
    
    if (create === 1){
        return (
            <>
                <Sidebar create = {create} setCreate = {setCreate}/>
                <UserProfile_TopInfo/>
                <UserProfile_Gallery userName = {"grp3foreva"}/>
                <Dragdrop create = {create} setCreate = {setCreate}/>
            </>
        )
    } else {
        return (
            <>
                <Sidebar create = {create} setCreate = {setCreate}/>
                <UserProfile_TopInfo/>
                <UserProfile_Gallery userName = {"grp3foreva"}/>
            </>
        )
    }
};
