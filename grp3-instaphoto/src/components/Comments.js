//Comments.js

import {useState, useEffect} from "react";
import Comment from './Comment';
import CommentForm from './CommentForm';
import {createCommentInPost} from '../api/mock_api';

const Comments = (list_, id_, props) => {
    
    const [backendComments, setBackendComments] = useState([]);
    
    //useEffect(()=>{}, []); // triggered once after mounting
    // const relevantComment = listComment.filter();

    const addComment = async(text) => {
        const newComment = {username:"grp3foreva", message:text, tagOfOtherUsers:null,id:null};
        console.log(text);
        console.log(newComment);
        
        // toggle comments
        // const PostIdTemp = id_.valueOf();

        // toggle comments with PostIdTemp
        const PostIdTemp = "CREL3Vi";
        console.log(PostIdTemp);


        const newStoredComment = await createCommentInPost(PostIdTemp, newComment);
        // const newStoredComment = await createCommentInPost(props.post.id, newComment);

    }

    // return(  
    //    <div> 
    //     <div className="comment-form-title">Enter comment</div>
    //     <CommentForm submitLabel="Write" handleSubmit={addComment}/>
    //     <div>
    //     {props.list.map(item => (
    //       <div key={item.id}>
    //         <Comment key={item.id} comment={item}></Comment>
    //       </div>
    //   ))}
    //   </div>
    //   </div>
      
    //   )

      return(  
        <div> 
         <div className="comment-form-title">Enter comment</div>
         <CommentForm submitLabel="Write" handleSubmit={addComment}/>
         <div>
            {/* {id_.id} */}
         {list_.list.map(item => (
           <div key={item.id}>
             <Comment key={item.id} comment={item}></Comment>
           </div>
       ))}
       </div>
       </div>
       
       )

}

export default Comments;