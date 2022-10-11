import '../post.css';
import React, { useState, Fragment } from "react";

const Post = () => {
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            className="postProfileImg"
                            src={require('../images/test.png')}
                            alt=""
                        />
                        <span
                            className="postUsername">jmscn
                        </span>

                    </div>
                </div>

                <div className="postCenter">
                    <img 
                    className="postImage" 
                    src={require('../images/userpic.PNG')}
                    alt="" />
                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src= {require("../images/heart.png")} alt="" />
                        <img className="likeIcon" src= {require("../images/comment.png")} alt="" />
                        <span className="postLikeCounter"> 32 likes</span>
                    </div>
                    
                    <div className="postBottomRight">
                        
                        <span className="postCommentText">9 comments</span>

                    </div>
                    
                </div>


            </div>
        </div>
    )

}
export default Post;