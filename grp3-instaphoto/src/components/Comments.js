//Comments.js

import {useState, useEffect} from "react";
import Comment from './Comment';

const Comments = (props) => {
    
    const [backendComments, setBackendComments] = useState([]);
    
    //useEffect(()=>{}, []); // triggered once after mounting
    // const relevantComment = listComment.filter();

    return(  
        
        props.list.map(item => (
          <div key={item.id}>
            <Comment key={item.id} comment={item}></Comment>
          </div>
      ))
      )
}

export default Comments;