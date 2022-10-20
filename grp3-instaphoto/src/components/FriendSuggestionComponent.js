//create a follow button
//return that button
//https://www.youtube.com/watch?v=iRORiaLAgaE
import React, { useState, Fragment, useRef, useContext } from "react";
import { Navbar, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactDOM from "react-dom";
import { getUsers, getUser, createUser, getTimelinePosts, getPosts, createPost } from '../api/mock_api';
import { nanoid } from "nanoid"

import '../FriendSuggestion.css';

const FriendSuggestionComponent = (props) => {
    const [isfollowed, setisfollowed] = useState(props.isfollowed);
    return (
        <div className="container-1_FriendSuggestion">
            <img className="image-0_FriendSuggestion" src={props.image} />
            <div className="container-2_FriendSuggestion">
                <div className="container-3_FriendSuggestion">
                    <span className="text-1_FriendSuggestion">{props.name}</span>
                    <span className="text-2_FriendSuggestion">{props.description}</span>
                </div>
                <div className="container-4_FriendSuggestion">

                    <span className="text-3_FriendSuggestion" onClick={()=>{
                        setisfollowed(!isfollowed)
                    }} >{isfollowed? "Unfollow":"Follow"}</span>

                </div>

            </div>
        </div>)

}
export default FriendSuggestionComponent;





// functions.addFollower = (user, followingId) => {
//     return functions
//         .getUsers(user)
//         .then((id) => sanityClient.patch(id[0]._id))
//         .setIfMissing({ following: [] }).insert("after", "following[-1]", [{ _ref: followingId, _key: nanoid(), _type: "reference" }])
//         .commit();
// };

// functions.removeFollower = (user, followingId) => {
//     return function.getUsers(user).then((id))
// }
// export default functions



//have a function that sends the http request POST to the backend


//parent component will get the list of all followers in the backend 

//make it clear that this is how when you follow a user click back to user profile 