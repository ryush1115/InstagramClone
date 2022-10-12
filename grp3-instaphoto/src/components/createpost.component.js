import '../createpost.css';
import React, { useState, Fragment, useRef, useContext} from "react";
import Context from '../context';
import axios from 'axios';

const CreatePost = (props) => {
    const { toggleModal } = props;
    const filepickerRef = useRef(null);

    const [postImage, setPostImage] = useState(null);
    const [uploadedPostImage, setUploadedPostImage] = useState(null);

    return (
        <div className="create-post">
            <div className="create-post_content">
                <div className="create-post_container">
                    <div className="create-post_title">Create new post</div>
                    <div className="create-post_close">
                        <img 
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
                            alt="close"
                            />
                    </div>
                </div>
            </div>
            <div className="create-post_subtitle"></div>
            <div className="create-post_form">
                <div>
                    <img 
                        //src={require('../images/grp3.PNG')}
                        alt="post-content"
                        />
                </div>
                <p>Upload photos and videos here</p>
            </div>
            <div className="create-post_footer">
                <div className="create-post_upload">
                    <span> Upload </span>
                </div>
            </div>
        </div>

    )
}
export default CreatePost;