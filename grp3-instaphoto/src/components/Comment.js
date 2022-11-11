// Comment.js
import '../comments.css';
import CommentForm from './CommentForm';

const Comment = ({
    comment, 
    activeComment, 
    setActiveComment,
    updateComment

}) => {
    const currentUserId = "grp3foreva"; // login username
    const canEdit = comment.username === currentUserId; // allow editing if comment username matches current user Id
    const fiveMinutes = 300000; // equivalent to five minutes
    const isEditing = 
        activeComment &&
        activeComment.type === "editing" &&
        activeComment.id === comment.id;
    
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
                        handleSubmit = {(text)=>updateComment(text, comment.id)}
                        handleCancel = {()=>setActiveComment(null)}
                        />
                    )}
                    {canEdit && <div 
                        className="comment-actions"
                        onClick={()=>
                            setActiveComment({id: comment.id, type:"editing"})
                        }
                        >
                        Edit</div>}
                </div>
            </div>

        </div>
    );
}

export default Comment;