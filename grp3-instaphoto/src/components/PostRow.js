import React, { useState, useEffect, useRef } from "react";
import '../activityfeed.css';
import '../userprofile.css';
import {  createComment, deletePost, isMyLikePost,incrementPostLike, cancelPostLike, getCommentMessage} from '../api/mock_api';

export default function PostRow(props) {
    const[, setNewComment] = useState(null);
    const[, setDeletedPost] = useState(null);
    const[, setIncrementLike] = useState(null);

    const [isLiked, setIsLiked] = useState();
    const [likeCounter, setLikeCounter] = useState(props.post.like.length);
    
    const someFetch = async () => {
      //using JS fetch API
      const data = await isMyLikePost(props.post.id)
      setIsLiked(data);
  }
 

    useEffect(() => {

        someFetch();

    },[]);

    // Ref variable 
    const loadData = useRef(false);

    let newPostComment_;
    let tagOfOtherUsers;

    // stores user input for the comment
    const handleOnChangeComment = (e) => {
      if (e.target.name==='commentBox_')  {
        newPostComment_ = e.target.value;
      }
    }

    // handle create comment
    const handleCreateComment = async (e) => {
      // stop default behavior to avoid reloading the page
      e.preventDefault();
      // use a dummy ID for now
      const newComment = {username:"grp3foreva", message:newPostComment_, tagOfOtherUsers:null,id:10};
      
      console.log(newComment);
      // clear the form
      const form = document.getElementById('commentBox');
      form.reset();
      const newStoredComment = await createComment(newComment); 
      // update LoadData
      loadData.current = true;
      setNewComment(newStoredComment);
    }

    // useEffect(()=>{

    // });
    // handle delete Post
    const handleDeletePost = async(e) => {
      
      //e.preventDefault();
      console.log("Delete post");
      const newDeletedPost = await deletePost(props.post.id);
      //update load data
      
      setDeletedPost(newDeletedPost);
      loadData.current = true;
    }

    // handle increment Like
    const handleLikeClick = async(e) => {
      //console.log("Increment Like");
      if(isLiked){
        setIsLiked(false);
        cancelPostLike(props.post.id);
        setLikeCounter(likeCounter - 1);
      }else{
        setIsLiked(true);
        incrementPostLike(props.post.id);
        setLikeCounter(likeCounter + 1);
      }
    }

    const handleGetPost = async(e) => {
      const newComment = await getCommentMessage(props.postCommentsArray[0]);
    }

    return (
      <tr>
        <div className="post"
        >
          {/* {props.post.username} */}
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                {/* <img
                          className="postProfileImg"
                          src={require('../images/test.png')}
                          alt=""
                      /> */}
                <span className="postUsername" data-testid = "testing1"> 
                  {props.post.username}
                </span>
                <span className="PostId"> 
                <p>Post Id: {props.post.id}</p>
                </span>
              </div>
            </div>

            <div className="postCenter">
              <img
                className="postImage"
                src={props.post.postImage}
                alt="" />
            </div>

            <div className="postBottom">
              <div className="postBottomLeft">
                {props.post.postCaption}
              </div>

              <label class="switch">
              {/* <div className="container-4_FriendSuggestion"> */}
                <button data-testid="button-0" onClick={()=>{
                          handleLikeClick();
                          //setisfollowed(!isfollowed)
                }} >{isLiked? "unLike":"Like"}
                </button>
              {/* </div> */}
              <p data-testid = "likeCounter">{likeCounter}</p>
                {/* <span class="slider">Like</span> */}
              </label>

              <button type="remove" onClick={handleDeletePost}>Delete</button>
              {/* <button type="remove">Edit</button> */}
              
            </div>
            <div className="postBottom">
              {/* <p> Testing </p> */}
              <form id="commentBox" onSubmit={handleCreateComment}>
                <label></label>
                <input type="text" 
                name="commentBox_" 
                className="commentBox" 
                size="15" 
                placeholder="Enter a comment..." 
                onChange={handleOnChangeComment}
                />
                <button type="submit">Post!</button>
              </form>
              <div className="postBottomRight">
                
                <span className="postCommentText"> Comments Array: {props.post.postCommentsArray} </span>

              </div>

            </div>
          </div>
        </div>
      </tr>
    );
  }