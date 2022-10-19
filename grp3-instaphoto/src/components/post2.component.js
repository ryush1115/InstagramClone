import '../post.css';
import React, { useState, Fragment } from "react";


const Post2 = (props) => {

    return (
        <div className="post"
            >
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            className="postProfileImg"
                            src={require('../images/test.png')}
                            alt=""
                        />
                        <span
                            className="postUsername"> jmscn
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
                    </div>
                    <form id="commentBox">
                    <label></label>
                        <input type="text" className="commentBox" size="50" placeholder="Enter a comment..."/>
                    </form>
                    <div className="postBottomRight">

                        <span className="postCommentText">{} comments</span>

                    </div>

                </div>


            </div>
        </div>
    )

}
export default Post2;
