//Comments.js
import {useState, useEffect, useRef} from "react";
import Comment from './Comment';
import CommentForm from './CommentForm';
import {createCommentInPost, getTokenUser, updateComment} from '../../../api/mock_api';

export default function Comments(props) {
  // counter to provide unique key to rows
  const counter = useRef(0);

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

    const updateComment = async(text) => {
      const updatedComment = await updateComment(text, props._id, commentid);
    }

      return(  
        <div> 
         <div className="comment-form-title">Enter comment</div>
         
         <CommentForm submitLabel="Write" handleSubmit={addComment}/>

         <div>
         {props.list.map(item => (
           <div key={item._id}>
            {/* <div key={props._id}> */}
             <Comment 
                key={item._id}
                comment={item}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
                postid = {props._id}
                userLoginName7 = {props.userLoginName6}
                />
           </div>
       ))}
       </div>
       </div>
       )

};