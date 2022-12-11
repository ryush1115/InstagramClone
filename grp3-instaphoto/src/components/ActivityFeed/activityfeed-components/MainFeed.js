import React, {useEffect, useState} from 'react';
import ActivityFeedUsername from "./Activity-Feed-Username";
import AddPost from "./AddPost";
import './activityfeed.css';
import Sidebar from "../../sidebar.component";
import {getTokenUser} from "../../../api/mock_api";

export default function MainFeed(props) {
    const [create, setCreate] = useState('default');
    
    const [user, setUser] = useState({});

    useEffect(() => {
        getTokenUser().then((user) => {
            setUser(user.data);
        });
    }, []);

    return (
        <div className={"mainfeed-wrapper"}>
            <Sidebar create = {create} setCreate = {setCreate}/>
            <div className={"mainfeed"}>
                <div className="profile">
                    <div className="profile-image">
                        <img alt="" src={user.profilePicture} />
                    </div>
                    <ActivityFeedUsername username={user.username}/>
                </div>
                <div className="container">
                    <div className="feed">
                        <div className="feedWrapper">
                            <AddPost />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
