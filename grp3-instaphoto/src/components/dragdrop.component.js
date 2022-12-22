import React, {useEffect, useState} from "react";
import '../dragdrop.css';
import {createPost, getTokenUser, getUserPosts} from '../api/mock_api';
import axios from 'axios';
const rootURL = 'http://localhost:8000'

// <input> elements with type="file" let the user choose one or more files from their device storage.
// Once chosen, the files can be uploaded to a server using form submission, or manipulated using JavaScript
// code and the File API.

// drag drop file component

// only accept certain file formats (jpeg, jpg, png)
export default function DragDrop(props) {
  
  // ref to the input using the 'useRef' hook
  const inputRef = React.useRef(null);

  const [username, setUsername] = useState("");
  const [image, setImage] = useState();
  const [caption, setCaption] = useState("");
  

  const [imageURL, setImageURL] = useState("url");

  //let imageURL = "URP"
  useEffect(() => {
      getTokenUser().then((user) => {
          setUsername(user.data.username);
      });
  }, []);

//   const [, setNewPost] = useState(null);

  // create variables for post creation
  let newPostComment;
  //let newPostImage;


  const setPicture = async (e) => {
    //e.preventDefault()

    console.log(imageURL);
    const formData = new FormData();
    formData.append("image", image)
    formData.append("caption", caption)
    const response = await axios.post(`${rootURL}/postsfile`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
    console.log("Response", `${response.data}`)
  
    setImageURL(response.data.imagePath);


}

  const handleCreatePost = async (e) => {
    // stop default behavior to avoid reloading the page
    
    //e.preventDefault();
    
    // create new Post variable
    console.log(username);
    console.log(newPostComment);
    const newPost = {username: username, postImage: imageURL, postCaption: caption, publicPrivate:true, postTagOfOtherUsers:[], postCommentArray:[], like: []};
    // clear the form
    const form = document.getElementById('add-post');
    
    // send POST request to create the Post
    const newStoredPost = await createPost(newPost);
    
    // newStoredPost has an id
    // then update state to trigger re-rendering and load
    // the list of Post (FilterablePostTable) from
    // backend
    ///////////////////////////setNewPost(newStoredPost);
    //props.setCreate('default');
    // reload the page
    window.location.reload();
  };

  // when dragActive is true, add an invisible elemnt to cover the entire state form. 
  // this listens to the events without interference from any other elements.

    if (sessionStorage.getItem("token")) {
        return (
            <div className="create-post_">
                <div className="create-post-content_">
                    <div className="create-post_title_">Create a new post!</div>
                    <form id="form-file-upload">
                        <p> Create a Post Here!! </p>
                        <input
                            type="text"
                            name="caption"
                            placeholder="Enter a caption..."
                            onChange={e => setCaption(e.target.value)}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            name="postImage"
                            placeholder="Add a url"
                            onChange={e => setImage(e.target.files[0])} 
                        />
                    </form>
                    <button onClick={()=>setPicture()}>Comfirm the image</button>
                    <button onClick={()=>handleCreatePost()}>Create Post</button>
                </div>


                {/* <h>{imageURL}</h> */}
            </div>
        );
    } else {
        window.location.href = "/sign-in";
    }
};