import React, { useState, Fragment, useCallback} from "react";
import './userprofile.css';
import Sidebar from './sidebar.component'
import GalleryWrapper from './gallery.wrapper'
import Dragdrop from './dragdrop.component'

const Userprofile=()=>{
    
    const [create, setCreate] = useState('default');
    
    if (create === 1){
        return (
            <Fragment>
                <Sidebar create = {create} setCreate = {setCreate}/>
                <GalleryWrapper />
                <Dragdrop create = {create} setCreate = {setCreate}/>
            </Fragment>
        )
        }
        else{
            return (
                <Fragment>
                    <Sidebar create = {create} setCreate = {setCreate}/>
                    <GalleryWrapper/>
                </Fragment>
            )
        }
}

export default Userprofile;