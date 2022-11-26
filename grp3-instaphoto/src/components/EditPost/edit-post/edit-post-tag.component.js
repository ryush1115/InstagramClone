import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTag, faX } from "@fortawesome/free-solid-svg-icons";
import './edit-post-tag.component.css';

export default function EditPostTagComponent(props) {

    const color = props.color;
    const hashtag = props.hashtag;

    return (
        <div className={"hashtag-wrapper"} style={{backgroundColor: color}}>
            <FontAwesomeIcon icon={faTag} className={"hashtag-icon"} />
            <div className={"hashtag-text"}>{hashtag}</div>
            <FontAwesomeIcon icon={faX} className={"hashtag-delete-icon"} onClick={() => props.deleteAction(hashtag)}/>
        </div>
    );
}
