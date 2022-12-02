import React, { useState, useEffect, useRef } from "react";
import './activityfeed.css';
import '../../UserProfile/userprofile.css';
import {  createComment, deletePost, isMyLikePost,incrementPostLike, cancelPostLike, getCommentMessage, createCommentInPost} from '../../../api/mock_api';
import Comment from './Comment';
import Comments from './Comments';

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

    const loadData = useRef(false);

    let newPostComment_;
    let tagOfOtherUsers;

    // stores user input for the comment
    const handleOnChangeComment = (e) => {
      if (e.target.name==='commentBox')  {
        newPostComment_ = e.target.value;
      }
    }

    // handle create comment
    const handleCreateComment = async (e) => {
      // stop default behavior to avoid reloading the page
      e.preventDefault();
      // use a dummy ID for now
      const newComment = {username:"grp3foreva", message:newPostComment_, tagOfOtherUsers:null,id:null};
      
      console.log(newComment);
      // clear the form
      const form = document.getElementById('commentBox');
      form.reset();
      const newStoredComment = await createComment(newComment); 
      // update LoadData
      loadData.current = true;
      setNewComment(newStoredComment);
    }

    // handle create comment in post
    const handleCreateCommentInPost = async(e) => {
      e.preventDefault();
      
      const newComment = {username:"grp3foreva", message:newPostComment_, tagOfOtherUsers:null,id:null};

      console.log(newComment);

      const form = document.getElementById('commentBox');
      form.reset();
      const newStoredComment = await createCommentInPost(props.post._id, newComment);

      // update loadData
      loadData.current = true;
      setNewComment(newStoredComment);

    }

    // });
    // handle delete Post
    const handleDeletePost = async(e) => {
      
      //e.preventDefault();
      console.log("Delete post (*)");
      const newDeletedPost = await deletePost(props.post._id);
      console.log(newDeletedPost);
      //update load data
      
      setDeletedPost(newDeletedPost);
      loadData.current = true;
    }

    const ListOfComments = (props) => {
      return(  
        props.list.map(item => (
          <div key={item._id}>
            <Comment key={item._id} comment={item}></Comment>
          </div>
      ))
      )
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
                <p>Post Id: {props.post._id}</p>
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
							
							
              {/* <button type="remove" onClick={handleDeletePost}>Delete</button> */}
              {/* <button type="remove">Edit</button> */}
              
            </div>
            {/* <div className="postBottom">
             
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

            </div> */}
						<div className="postBottom">

              <div className="postBottomLeft">
                
                <Comments 
                  list={props.post.postCommentArray} 
                  _id={props.post._id} 
                  props={props}
                  />
              </div>
              
              <div>
                {/* {props.post.postComment} */}
              </div>
              <div className="postBottomRight">
                  {/* <List list={commentArray}/> */}
                  {/* <ListOfComments list={props.post.postCommentArray}/> */}
                  {/* <Comments list={props.post}/> */}
                  

              </div>
							<div style ={{'margin-top' : '2.3em'}}>	
									<button data-testid="button-0" onClick={()=>{
														handleLikeClick();
														//setisfollowed(!isfollowed)
									}} >{isLiked? "unLike":"Like"}
									</button>
									<p data-testid = "likeCounter">{likeCounter}</p>
							</div>
              
            </div>
            <div className="postBottom-Lower" >
            	<form id="commentBox">
                
                {/* <input type="text" className="commentBox" name="commentBox" size="20" onChange={handleOnChangeComment} placeholder="Enter a comment..." />
                <button type="submitComment" onClick={handleCreateCommentInPost}>Enter</button> */}
              </form>
              <button type="remove" onClick={handleDeletePost}>Delete</button>
            </div>
          </div>
        </div>
      </tr>
    );
  }