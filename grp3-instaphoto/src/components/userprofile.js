import React, { useState, Fragment, useCallback} from "react";
import '../userprofile.css';
import Sidebar from './sidebar.component'
import Gallery from './gallery.component'
import CreatePost from './createpost.component'
import ImageGrid from './imagegrid.component'
import cuid from "cuid";

const Userprofile=()=>{
    
    const [images, setImages] = useState([]);
    const [imageSrc, setImageSrc] = useState('default');
    const [create, setCreate] = useState('default');
    const [postCount, setPostCount] = useState(39);

    console.log("printing create in user profile " + create);
    
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            setImages((prevState) => [
            ...prevState,
            { id: cuid(), src: e.target.result },
            ]);
        };
        reader.readAsDataURL(file);
        return file;
        });
    }, []);

    console.log({images});

    if (imageSrc === 'default' && create === 1){
    return (
        <Fragment>
            <Sidebar create = {create} setCreate = {setCreate} postCount = {postCount} setPostCount = {setPostCount}/>
            <Gallery imageSrc = {imageSrc} postCount = {postCount}/>
            <CreatePost onDrop={onDrop} accept={"image/*"}/>
            <ImageGrid images={images} imageSrc ={imageSrc} setImageSrc = {setImageSrc}/>
        </Fragment>
    )
    }
    else{
        return (
            <Fragment>
                <Sidebar create = {create} setCreate = {setCreate} postCount = {postCount} setPostCount = {setPostCount}/>
                <Gallery imageSrc = {imageSrc} postCount = {postCount}/>
            </Fragment>
        )
    }


    
}

export default Userprofile;