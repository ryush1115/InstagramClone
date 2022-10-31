//create a FriendSuggestion component
//return that component
//https://www.youtube.com/watch?v=iRORiaLAgaE
import React, { useState, useEffect, useRef, useContext } from "react";
import { getMyFollowings } from '../api/mock_api';
import { Navbar, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactDOM from "react-dom";
import { getUsers, getUser, createUser, getTimelinePosts, getPosts, createPost } from '../api/mock_api';
import { nanoid } from "nanoid"
// import ellipse507 from "../images/ellipse507.png";
import SingleLineUserInfo from "./SingleLineUserInfo"

import '../FriendSuggestion.css';

const FollowingList = (props) => {
    // const [isfollowed, setisfollowed] = useState(props.isfollowed);
    
    //const [FriendSuggestionList, setFriendSuggestionList] = useState([{ name: "Akikos", image: null, description: "This is a cool person", isfollowed: true }]);
    
    const [followings, setFollowings] = useState([]);
    let data;
    const someFetch = async () => {
        //using JS fetch API
        data = await getMyFollowings();
        // assuming the state is in the form of an array
        // console.log(data);
        setFollowings(data);
    }
   

    useEffect(() => {

        someFetch();
        console.log(followings);

    },[]);
    console.log(data);
    console.log(followings);
    return (
            <div className="container-0_FriendSuggestion">
                <span className="text-0_FriendSuggestion" data-testid = "followbutton">Following</span>
                {   
                    followings.map((v) => {
                    return <SingleLineUserInfo name={v} description={"This is a cool person"} image={null} isfollowed={true} />
                })}
            </div>

    );

}
export default FollowingList;

