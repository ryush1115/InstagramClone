//Comments.js

import {useState, useEffect} from "react";
import { NavItem } from "react-bootstrap";

const Comments = ({currentUserId, listComment}) => {
    
    const [backendComments, setBackendComments] = useState([]);
    
    //useEffect(()=>{}, []); // triggered once after mounting
    const relevantComment = listComment.filter();

    return (
        <div className="comments">
            {/* <h1 className="comments-title">Comments!</h1> */}
            <div className="comments-container">
                {listComment.map(item => (
                    <div key = {item.id}>
                        </div>  

                ))}

            </div>
        </div>
    );
}

export default Comments;