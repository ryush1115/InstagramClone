import React, { useState, Fragment, useCallback} from "react";
import './userprofile.css';
import Sidebar from '../sidebar.component'
import GalleryWrapper from './user-profile-components/gallery.wrapper'
import Dragdrop from '../dragdrop.component'
import UserProfile_TopInfo from './user-profile-components/userprofile-topinfo.component'
import UserProfile_Gallery from './user-profile-components/userprofile-gallery.component'

const Userprofile=()=>{
    
    const [create, setCreate] = useState('default');
    
    if (create === 1){
        return (
            <Fragment>
                <Sidebar create = {create} setCreate = {setCreate}/>
                <UserProfile_TopInfo/>
                <UserProfile_Gallery/>
                {/* <GalleryWrapper /> */}
                <Dragdrop create = {create} setCreate = {setCreate}/>
            </Fragment>
        )
        }
        else{
            return (
                <Fragment>
                    <Sidebar create = {create} setCreate = {setCreate}/>
                    <UserProfile_TopInfo/>
                    <UserProfile_Gallery/>
                    {/* <GalleryWrapper/> */}
                </Fragment>
            )
        }
}

export default Userprofile;