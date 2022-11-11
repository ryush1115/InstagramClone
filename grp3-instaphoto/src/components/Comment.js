// Comment.js
import '../comments.css';

const Comment = ({comment}) => {
    
    
    return (
        <div className="comment">
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}  </div>
                    <div className="comment-text">{comment.message}</div>
                    <div className="comment-actions">Edit</div>
                </div>
            </div>

        </div>
    );
}

export default Comment;