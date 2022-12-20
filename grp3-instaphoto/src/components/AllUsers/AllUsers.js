//create a FriendSuggestion component
//return that component
//https://www.youtube.com/watch?v=iRORiaLAgaE
import React, { useState, useEffect, useRef, useContext } from "react";
import { getUsers, isMyFollowing } from '../../api/mock_api';
import SingleLineUserInfo from "./SubComponents/SingleLineUserInfo"

import '../FriendSuggestion-page/FriendSuggestion.css';

const UserList = () => {
    
    const [userList, setUserList] = useState([]);
    const [followStatusList, setFollowStatusList] = useState([]);
    let counter = -1;

    const someFetch = async () => {
        const data = await getUsers();
        console.log(data);
        setUserList(data);
        
        const tempList = [];
        let i;
        for(i = 0; i < data.length; i++){
            const isFollow = await isMyFollowing(data[i].username);
            tempList.push(isFollow);
        }

        setFollowStatusList(tempList);
        console.log(`${tempList}`);
        console.log(`${followStatusList}`);
    }
   

    useEffect(() => {

        someFetch();
 

    },[]);
   

    if (sessionStorage.getItem("token")) {
        if (!!userList) {
            return (
                <div className="container-0_FriendSuggestion">
                    <span className="text-0_FriendSuggestion" data-testid = "followbutton">Following</span>
                    {
                        userList.map((v) => {
                            counter++;
                            console.log(`${followStatusList}`);
                            console.log(`${counter}`);
                            console.log(`${followStatusList[counter]}`);
                            return <SingleLineUserInfo name={v.username} description={"This is a cool person"} image={null} isfollowed={followStatusList[counter]} />
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
    } else {
        console.log("not signed in");
        window.location.href = "/sign-in";
    }
}
export default UserList;

