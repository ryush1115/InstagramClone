//create a FriendSuggestion component
//return that component
//https://www.youtube.com/watch?v=iRORiaLAgaE
import React, { useState, useEffect, useRef, useContext } from "react";
import { getMyFollowings } from '../../api/mock_api';
import SingleLineUserInfo from "./SubComponents/SingleLineUserInfo"

import '../FriendSuggestion-page/FriendSuggestion.css';

const FollowingList = () => {
    
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

