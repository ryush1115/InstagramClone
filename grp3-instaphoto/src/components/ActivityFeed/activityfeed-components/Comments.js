//Comments.js
import {useState, useEffect, useRef} from "react";
import Comment from './Comment';
import CommentForm from './CommentForm';
import {createCommentInPost, getTokenUser, updateComment as updateCommentAPI} from '../../../api/mock_api';
import './activityfeed.css'

export default function Comments(props) {
  // counter to provide unique key to rows
  //const counter = useRef(0);

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
        return newStoredComment;
    }
// handleSubmit = {(text)=>updateComment(text, postid, comment._id)}
    const updateComment = async(text, postID, commentID) => {
      console.log("text", text);
      console.log("props._id", props._id);
      console.log("commentID", commentID);
      const updatedComment = await updateCommentAPI(text, props._id, commentID);
      //updateComment(text, props._id, commentID).then(()=> {})
      return updatedComment;

      // need to map through backendcomments
      // const updatedBackendComments = backendComments.map(backendComment) => {
      // if (backendComment.id === commentID) {
      // 
      //}
      //} See 54.26 of https://www.youtube.com/watch?v=sjAeLwuezxo&ab_channel=MonsterlessonsAcademy
    }

      return(  
        <div className={"commentsBox"}>
         <div className="comment-form-title">Enter comment</div>
         
         <CommentForm submitLabel="Write" handleSubmit={addComment}/>

         <div className={"commentsBox"}>
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