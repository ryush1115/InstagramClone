import React, { useState, useEffect, useRef } from "react";
import './activityfeed.css';
import '../../UserProfile/userprofile.css';
import {deletePost, isMyLikePost,incrementPostLike, cancelPostLike} from '../../../api/mock_api';
import Comments from './Comments';
import PostPopupTag from "../../UserProfile/post-popup/post-popup-tag.component";
import '../../UserProfile/post-popup/post-popup-tag.css';
import LikeButton from "./LikeButton";

export default function PostRow(props) {
  const user = props.user;                      // current User
  const currentUserId = user.username;    // current User Id
  const canDelete = props.post.username === currentUserId; // allow delete post if post author username matches current user Id
  const canHide = props.post.username === currentUserId; // allow delete post if post author username matches current user Id

  const post = props.post;

  const[, setDeletedPost] = useState(null);

    const loadData = useRef(false);

    // handle delete Post
    const handleDeletePost = async(e) => {
      
      //e.preventDefault();
      console.log("Delete post (*)");
      const newDeletedPost = await deletePost(post._id);
      console.log(newDeletedPost);
      //update load data
      
      setDeletedPost(newDeletedPost);
      loadData.current = true;
    }

  const loadTags = () => {
    if (post.postTagOfOtherUsers.length > 0) {
      console.log("Loading tags")
      console.log(post.postTagOfOtherUsers);
      return post.postTagOfOtherUsers.map((tag) => {
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
                <a href={`/user/${post.username}`} className="postUsername" data-testid = "testing1">
                  {post.username}
                </a>
              </div>
            </div>
            <div className="postCenter">
              <img
                className="postImage"
                src={post.postImage}
                alt="" />
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                {post.postCaption}
              </div>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <Comments 
                  list={post.postCommentArray}
                  _id={post._id}
                  props={props}
                  user={user}
                  userLoginName6 = {user.username}
                  />
              </div>
              <LikeButton user={user} post={post}/>
            </div>
            <div className="postBottom-Lower" >
              <form id="commentBox"/>
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