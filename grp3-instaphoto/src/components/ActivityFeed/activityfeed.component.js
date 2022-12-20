import './activityfeed-components/activityfeed.css';
import '../UserProfile/userprofile.css';
import React, {useEffect, useState, useRef} from 'react';
import ActivityFeedUsername from "./activityfeed-components/Activity-Feed-Username";
import './activityfeed-components/activityfeed.css';
import Sidebar from "../sidebar.component";
import {getTokenUser} from "../../api/mock_api";
import FilterablePostTable from "./activityfeed-components/FilterablePostTable";

export default function ActivityFeedComponent(props) {

    const [create, setCreate] = useState('default');

    const [user, setUser] = useState({});

    const loadData = useRef(false);

    const [isBusy, setBusy] = useState(true)


    useEffect(() => {
        getTokenUser().then((user) => {
            console.log("parent.js");
            setUser(user.data);
            setBusy(false);
        });
    }, []);

    if (sessionStorage.getItem("token")) {
        if (!isBusy) {
            return (
                <div className={"mainfeed-wrapper"}>
                    <Sidebar create={create} setCreate={setCreate}/>
                    <div className={"mainfeed"}>
                        <div className="profile">
                            <div className="profile-image">
                                <img alt="" src={user.profilePicture}/>
                            </div>
                            <ActivityFeedUsername username={user.username}/>
                        </div>
                        <div className="container">
                            <div className="feed">
                                <div className="feedWrapper">
                                    <div>
                                        <FilterablePostTable reload={loadData} user={user}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        window.location.href = "/sign-in";
    }
};
