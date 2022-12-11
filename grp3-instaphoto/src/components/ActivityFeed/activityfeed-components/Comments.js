//Comments.js
import {useState, useEffect} from "react";
import Comment from './Comment';
import CommentForm from './CommentForm';
import {createCommentInPost, getTokenUser, updateComment} from '../../../api/mock_api';

export default function Comments(props) {

    console.log(props.list);

    const [activeComment, setActiveComment] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        getTokenUser().then((user) => {
            setUser(user.data);
        });
    }, []);

    const addComment = async(text) => {
        const newComment = {username:user.username, message:text, tagOfOtherUsers:1,id:1};
        console.log("comment text: ", text);
        console.log(newComment);
        
        const newStoredComment = await createCommentInPost(props._id, newComment);
    }
    {/* <div key={item.id}> */}

      return(  
        <div> 
         <div className="comment-form-title">Enter comment</div>
         <CommentForm submitLabel="Write" handleSubmit={addComment}/>
         <div>
         {props.list.map(item => (
           <div key={props._id}>
            {/* <div key={props._id}> */}
             <Comment 
                key={item.id}
                comment={item}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
                postid = {props._id}
                usernameLoggedIn = {props}
                />
           </div>
       ))}
       </div>
       </div>
       )

};