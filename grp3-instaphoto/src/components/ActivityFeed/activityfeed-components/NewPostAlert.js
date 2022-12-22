import React from 'react';
import './new-post-alert.css'

export default function NewPostAlert(props) {
    return (
        <div className={"alert-wrapper"}>
            <p className={"alert-text"}>New Posts Available! Refresh or scroll down to see them.</p>
        </div>
    );
}
