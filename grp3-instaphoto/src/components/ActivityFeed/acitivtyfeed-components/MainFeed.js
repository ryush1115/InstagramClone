import React, {useState} from 'react';
import ActivityFeedUsername from "./Activity-Feed-Username";
import AddPost from "./AddPost";
import './activityfeed.css';
import Sidebar from "../../sidebar.component";

export default function MainFeed(props) {

    const [roster, setRoster] = useState([]);
    const [create, setCreate] = useState('default');

    return (
        <div className={"mainfeed-wrapper"}>
            <Sidebar create = {create} setCreate = {setCreate}/>
            <div className={"mainfeed"}>
                <div className="profile">
                    <div className="profile-image">
                        <img alt="" />
                        {/* <img src={require('../images/grp3.PNG')} alt=""/> */}
                    </div>
                    <ActivityFeedUsername username={"grp3foreva"}/>
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
