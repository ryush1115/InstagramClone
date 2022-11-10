import React , { useState } from "react";
import '../dragdrop.css';
import {createPost } from '../api/mock_api';


// <input> elements with type="file" let the user choose one or more files from their device storage.
// Once chosen, the files can be uploaded to a server using form submission, or manipulated using JavaScript
// code and the File API.

// drag drop file component

// only accept certain file formats (jpeg, jpg, png)
function DragDrop(props) {
  
  // ref to the input using the 'useRef' hook
  const inputRef = React.useRef(null);

  // drag state, initialized to false
  const [dragActive, setDragActive] = React.useState(false);  
  

  const [, setNewPost] = useState(null);

  // handle drag events
  
  // const handleDrag = function(e) {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   // also handles 'dragover' and 'dragleave'
  //   if (e.type === "dragenter" || e.type === "dragover") {
  //     setDragActive(true);
  //   } else if (e.type === "dragleave") {
  //     setDragActive(false);
  //   }
  // };

  // const handleDrop = function(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setDragActive(false);

  //   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
  //     // at least one file has been dropped so do something

  //   }
  // }

  // create variables for post creation
  let newUsername = "grp3foreva";
  let newPostCaption;
  let newPostImage = "http://loremflickr.com/640/480"; // default to this image for HW2
 

  const handleOnChange = function(e) {
    e.preventDefault();
    
    if (e.target.name==="comment") {
     newPostComment = e.target.value;
    }
    if (e.target.name==="postImage") {
      newPostImage = e.target.value; 
     }
  }

  const onButtonClick =() => {
    inputRef.current.click();
  }

  const handleCreatePost = async (e) => {
    // stop default behavior to avoid reloading the page
    e.preventDefault();
    // create new Post variable
    const newPost = {username: newUsername, postImage: newPostImage, postComment: newPostComment, publicPrivate:false, postTagOfOtherUsers:null, postCommentArray:[], id:null};
    // clear the form
    const form = document.getElementById('add-post');
    
    // send POST request to create the Post
    const newStoredPost = await createPost(newPost);
    
    // newStoredPost has an id
    // then update state to trigger re-rendering and load
    // the list of Post (FilterablePostTable) from
    // backend
    setNewPost(newStoredPost);
    props.setCreate('default');
  };

  // when dragActive is true, add an invisible elemnt to cover the entire state form. 
  // this listens to the events without interference from any other elements.  
  return (
      <div className="create-post_">
      <div className="create-post-content_">
        <div className="create-post_title_">Create a new post!</div>
        <form id="form-file-upload" onSubmit={handleCreatePost}>
        <p>Create a Post Here!! </p>    
            <input
              type="text"
              name="caption"
              placeholder="Enter a caption..."
              onChange={handleOnChange}
            />
            <input
              type="text"
              name="postImage"
              placeholder="Add a url"
              onChange={handleOnChange}
            />
            <button type="submit">Create Post</button>
        </form>
          
      </div>
      </div>
    );
  };

  export default DragDrop;