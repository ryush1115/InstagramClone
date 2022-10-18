import '../createpost.css';
import React, { useState, Fragment, useRef, useContext} from "react";
// import Context from '../context';
// import axios from 'axios';
import { useDropzone } from "react-dropzone";

const CreatePost = ({profilePost, setProfilePost, onDrop, accept, open}) => {
    // const { toggleModal } = props;
    // const filepickerRef = useRef(null);

    // const [postImage, setPostImage] = useState(null);
    // const [uploadedPostImage, setUploadedPostImage] = useState(null);
    
    const handleChange = () => {
        setProfilePost("new value");
     };

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
     useDropzone({
       accept,
       onDrop,
    });
    const files = acceptedFiles.map((file) => (
     <li key={file.path}>
       {file.path} - {file.size} bytes
     </li>
    ));

    return (
        
        <div className="create-post">
            <div className="create-post_content">
                <div className="create-post_container">
                    <div className="create-post_title" >Create new post</div>
                    <div className="create-post_close">
                        <img 
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
                            alt="close"
                            />
                    </div>
                    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">
              Release to drop the files here
            </p>
          ) : (
            <p className="dropzone-content">
              Drag’ n’ drop some files here, or click to select files
            </p>
          )}
          <button type="button" onClick={open} className="btn">
            Click to select files
          </button>
        </div>
      </div>
      
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
                </div>
            </div>
        </div>

    )
}
export default CreatePost;