import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTag} from "@fortawesome/free-solid-svg-icons";

export default function PostPopupTag(props) {

    const color = props.color;
    const hashtag = props.hashtag;

    return (
        <div className={"hashtag-wrapper"} style={{backgroundColor: color}}>
            <FontAwesomeIcon icon={faTag} className={"hashtag-icon"} />
            <div className={"hashtag-text"}>{hashtag}</div>
        </div>
    );
}
