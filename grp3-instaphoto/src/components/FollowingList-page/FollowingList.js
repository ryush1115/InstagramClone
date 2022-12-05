//create a FriendSuggestion component
//return that component
//https://www.youtube.com/watch?v=iRORiaLAgaE
import React, { useState, useEffect, useRef, useContext } from "react";
import { getMyFollowings } from '../../api/mock_api';
import SingleLineUserInfo from "./SubComponents/SingleLineUserInfo"

import '../FriendSuggestion-page/FriendSuggestion.css';

const FollowingList = () => {
    
    const [followings, setFollowings] = useState([]);
    const someFetch = async () => {
        const data = await getMyFollowings();
        console.log(data);
        setFollowings(data);
    }
   

    useEffect(() => {

        someFetch();
        console.log(followings);
        console.log(followings[0]);

    },[]);
    console.log(followings);
    if (!!followings) {
        return (
            <div className="container-0_FriendSuggestion">
                <span className="text-0_FriendSuggestion" data-testid = "followbutton">Following</span>
                {
                    followings.map((v) => {
                        return <SingleLineUserInfo name={v} description={"This is a cool person"} image={null} isfollowed={true} />
                    })}
            </div>

        );
    } else {
        console.log("no followings");
        return (
            <div className="container-0_FriendSuggestion">
                <span className="text-0_FriendSuggestion" data-testid = "followbutton">Following</span>
                <span className="text-0_FriendSuggestion" data-testid = "followbutton">You are not following anyone</span>
            </div>
        );
    }
}
export default FollowingList;

