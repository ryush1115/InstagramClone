import '../post.css';
import React, { useState, Fragment} from "react";
import {MoreVert} from "@material-ui/icons"

const Post=()=>{
    return (
        <div className = "post">
            <div className="postWrapper"></div>
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg" src= './images/grp3.PNG' alt=""/>
                        <span className="postUsername">jmscn</span>
                        <span className="postDate">5 minutes ago</span>
                    </div>
                    <div className="postTopRight">
                    </div>
                </div>
                
                <div className="postCenter">
                    <span className="postText">Hey! Its my first post  :)</span>
                    <img className="postImage" src="../images/userpic.PNG" alt=""/>

                <div className="postBottom"></div>
                    <div className="postBottomLeft"></div>
                    <div className="postBottomRight"></div>



                </div>
        </div>
    )

}
export default Post;