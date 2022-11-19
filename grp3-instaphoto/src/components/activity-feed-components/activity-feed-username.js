import React from 'react';
import '../../activityfeed.css';
import '../../userprofile.css';

export default function ActivityFeedUsername(props) {

    const username = props.username;

    return (
        <div className="profile-user-settings">
            <h1 className="profile-user-name">{username}</h1>
        </div>
    );
}
