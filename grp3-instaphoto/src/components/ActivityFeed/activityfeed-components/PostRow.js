import React, { useState, useEffect, useRef } from "react";
import './activityfeed.css';
import '../../UserProfile/userprofile.css';
import {deletePost, isMyLikePost,incrementPostLike, cancelPostLike} from '../../../api/mock_api';
import Comments from './Comments';
import PostPopupTag from "../../UserProfile/post-popup/post-popup-tag.component";
import '../../UserProfile/post-popup/post-popup-tag.css';

export default function PostRow(props) {
  const currentUserId = props.userLoginName5    // current User Id
  const canDelete = props.post.username === currentUserId; // allow delete post if post author username matches current user Id
  const canHide = props.post.username === currentUserId; // allow delete post if post author username matches current user Id


  const[, setDeletedPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(props.post.like.length);

    // TODO: Refactor this code
    const someFetch = async () => {
      //using JS fetch API
      const data = await isMyLikePost(props.post._id, props.userid);
      console.log("Printing in post row", data);
      setIsLiked(data);
      console.log('sss');
  }

    useEffect(() => {
        someFetch();
    }, []);

    // handle increment Like
    const handleLikeClick = async(e) => {
      //console.log("Increment Like");
      if(isLiked){
        setIsLiked(false);
        cancelPostLike(props.post._id, props.userid);
        console.log("This is postrow.js", props.userid);
        setLikeCounter(likeCounter - 1);
      }else{
        setIsLiked(true);
        incrementPostLike(props.post._id, props.userid);
        setLikeCounter(likeCounter + 1);
        console.log("This is postrow.js", props.userid);
      }
    }

    const loadData = useRef(false);

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

  const loadTags = () => {
    if (props.post.postTagOfOtherUsers.length > 0) {
      console.log("Loading tags")
      console.log(props.post.postTagOfOtherUsers);
      return props.post.postTagOfOtherUsers.map((tag) => {
        return <PostPopupTag color={tag.color} hashtag={tag.hashtag} />
      })
    } else {
      return <div className={"no-tags-text"}>No tags</div>
    }
  }
    // handle Hide Post
    const handleHidePost = async(e) => {
  
      //e.preventDefault();
      console.log("Hide post (*)");
      //const newDeletedPost = await deletePost(props.post._id);
      //console.log(newDeletedPost);
      //update load data
      
      //setDeletedPost(newDeletedPost);
      loadData.current = true;
    }

    return (
      <tr>
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <a href={`/user/${props.post.username}`} className="postUsername" data-testid = "testing1">
                  {props.post.username}
                </a>
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
            </div>
            <div className="postBottom">

              <div className="postBottomLeft">
                
                <Comments 
                  list={props.post.postCommentArray} 
                  _id={props.post._id} 
                  props={props}
                  userLoginName6 = {props.userLoginName5}
                  />
              </div>
              
              <div>
              </div>
              <div className="postBottomRight">
              </div>
							<div style ={{'margin-top' : '2.3em'}}>	
									<button data-testid="button-0" onClick={()=>{
														handleLikeClick();
									}} >{isLiked? "unLike":"Like"}
									</button>
									<p data-testid = "likeCounter">{likeCounter}</p>
							</div>
              
            </div>
            <div className="postBottom-Lower" >
            	<form id="commentBox">
              </form>
                {canDelete && <button type="remove" onClick={handleDeletePost}>Delete</button>}
              <div className={"post-popup-footer"}>
                <div className={"post-popup-tags"}>
                  {loadTags()}
                </div>
              </div>
                {/* {canHide && <button type="remove" onClick={handleHidePost}>Hide</button>} */}
            </div>
          </div>
        </div>
      </tr>
    );
  }