// Comment.js
import './comments.css';
import CommentForm from './CommentForm';
import React, {useEffect, useState} from 'react';
import {getTokenUser} from "../../../api/mock_api";

const Comment = ({
    comment, 
    activeComment, 
    setActiveComment,
    updateComment,
    postid,
    userLoginName7

}) => {
    
    const [user, setUser] = useState({});
    useEffect(() => {
        getTokenUser().then((user) => {
            setUser(user.data);
        });
    }, []);
    
    //const currentUserId = usernameLoggedIn; // login username
    const currentUserId = userLoginName7; // login username
    const canEdit = comment.username === currentUserId; // allow editing if comment username matches current user Id
    
    const isEditing = 
        activeComment &&
        activeComment.type === "editing" &&
        activeComment.id === comment._id;
    
    return (
        <div className="comment">
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}  </div>
                    {!isEditing && <div className="comment-text">{comment.message}</div>}
                    {isEditing && (
                        <CommentForm 
                        submitLabel="Update" 
                        hasCancelButton 
                        intialText={comment.message} 
                        handleSubmit = {(text)=>updateComment(text, postid, comment._id)}
                        handleCancel = {()=>setActiveComment(null)}
                        />
                    )}
                    {canEdit && <div 
                        className="comment-actions"
                        onClick={()=>
                            setActiveComment({id: comment._id, type:"editing"})
                        }
                        >
                        Edit</div>}
                </div>
            </div>

        </div>
    );
}

export default Comment;