// Comment.js
import './comments.css';
import CommentForm from './CommentForm';

const Comment = ({
    comment, 
    activeComment, 
    setActiveComment,
    updateComment,
    postid,
    //username

}) => {
    const currentUserId = comment.username; // login username
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