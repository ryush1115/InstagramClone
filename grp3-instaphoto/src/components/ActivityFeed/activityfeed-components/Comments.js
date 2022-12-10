//Comments.js
import {useState, useEffect} from "react";
import Comment from './Comment';
import CommentForm from './CommentForm';
import {createCommentInPost, getTokenUser, updateComment} from '../../../api/mock_api';

export default function Comments(props) {

    console.log(props.list);

    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        getTokenUser().then((user) => {
            setUser(user.data);
        });
    }, []);
    
    //useEffect(()=>{}, []); // triggered once after mounting
    // const relevantComment = listComment.filter();

    const addComment = async(text) => {
        const newComment = {username:user.username, message:text, tagOfOtherUsers:1,id:1};
        console.log(text);
        console.log(newComment);
        
        // Toggle comments with PostIdTemp
        // const PostIdTemp = id_.valueOf();

        const newStoredComment = await createCommentInPost(props._id, newComment);
        // const newStoredComment = await createCommentInPost(props.post.id, newComment);

    }

      return(  
        <div> 
         <div className="comment-form-title">Enter comment</div>
         <CommentForm submitLabel="Write" handleSubmit={addComment}/>
         <div>
            {/* {id_.id} */}
         {props.list.map(item => (
           <div key={item.id}>
             <Comment 
                key={item.id}
                comment={item}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
                postid = {props._id}
                >
             </Comment>
           </div>
       ))}
       </div>
       </div>
       )

};