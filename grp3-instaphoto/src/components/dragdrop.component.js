import React , { useState } from "react";
import '../dragdrop.css';
import {createPost } from '../api/mock_api';


// <input> elements with type="file" let the user choose one or more files from their device storage.
// Once chosen, the files can be uploaded to a server using form submission, or manipulated using JavaScript
// code and the File API.

// drag drop file component

// only accept certain file formats (jpeg, jpg, png)
function DragDrop() {
  
  // ref to the input using the 'useRef' hook
  const inputRef = React.useRef(null);

  // drag state, initialized to false
  const [dragActive, setDragActive] = React.useState(false);  
  

  const [, setNewPost] = useState(null);

  // handle drag events
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();

    // also handles 'dragover' and 'dragleave'
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something

    }
  }

  // create variables for post creation
  let newUsername = "grp3foreva";
  let newPostComment;
  let newPostImage = "http://loremflickr.com/640/480"; // default to this image for HW2

  const handleChange = function(e) {
    e.preventDefault();
    
    if (e.target.name==="comment") {
     newPostComment = e.target.value; 
    }
    if(e.target.target==="postImage" && e.target.files[0]) {
      // at least one file has been selected so do something
      newPostImage = e.target.value;
      newPostImage = "http://loremflickr.com/640/480";
    }  
  }

  const onButtonClick =() => {
    inputRef.current.click();
  }

  const handleCreatePost = async (e) => {
    // stop default behavior to avoid reloading the page
    e.preventDefault();
    // create new Post variable
    const newPost = {username: newUsername, postImage: newPostImage, postComment: newPostComment, publicPrivate:false, postTagOfOtherUsers:null, id:10};
    // clear the form
    const form = document.getElementById('add-post');
    form.reset();
    // send POST request to create the Post
    const newStoredPost = await createPost(newPost);
    
    // newStoredPost has an id
    // then update state to trigger re-rendering and load
    // the list of Post (FilterablePostTable) from
    // backend
    setNewPost(newStoredPost);
  };

  // when dragActive is true, add an invisible elemnt to cover the entire state form. 
  // this listens to the events without interference from any other elements.  
  return (
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="file" name="postImage" id="input-file-upload" multiple={true} onChange={handleChange}/>
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active": ""}>
          <div>
            <p>Drag and drop your photo here!</p>
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
          </div> 
          <input type="text" name="comment" placeholder="Caption for post..." onChange={handleChange}/>
        </label>
        <button type="submit">Create Post</button>
        {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
    );
  };

  export default DragDrop;