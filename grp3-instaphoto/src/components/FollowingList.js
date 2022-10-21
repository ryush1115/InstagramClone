//create a FriendSuggestion component
//return that component
//https://www.youtube.com/watch?v=iRORiaLAgaE
import React, { useState, Fragment, useRef, useContext } from "react";
import { Navbar, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactDOM from "react-dom";
import { getUsers, getUser, createUser, getTimelinePosts, getPosts, createPost } from '../api/mock_api';
import { nanoid } from "nanoid"
import ellipse507 from "../images/ellipse507.png";
import FriendSuggestionComponent from "./FriendSuggestionComponent"

import '../FriendSuggestion.css';

const FollowingList = (props) => {
    // const [isfollowed, setisfollowed] = useState(props.isfollowed);

    const [FriendSuggestionList, setFriendSuggestionList] = useState([{ name: "Akikos", image: ellipse507, description: "This is a cool person", isfollowed: true }]);
    return (
            <div className="container-0_FriendSuggestion">
                <span className="text-0_FriendSuggestion">Following</span>
                {FriendSuggestionList.map(v => {
                    return <FriendSuggestionComponent name={v.name} description={v.description} image={v.image} isfollowed={v.isfollowed} />
                })}
            </div>

    );

}
export default FollowingList;

