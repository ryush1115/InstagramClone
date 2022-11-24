import React from 'react';
import './activityfeed.css';

export default function ActivityFeedUsername(props) {

    const username = props.username;

    return (
        <div className="activity-feed-username-div">
            <h1>{username}</h1>
        </div>
    );
}
