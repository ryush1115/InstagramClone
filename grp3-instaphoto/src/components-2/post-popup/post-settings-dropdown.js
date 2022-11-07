import React from 'react';
import {useNavigate} from "react-router-dom";
import {deletePost} from "../../api/mock_api";

export default function PostSettingsDropdown(props) {

    const navigate = useNavigate();

    const isOpen = props.openState;

    const editPost = () => {
        navigate(`/edit-post/${props.postID}`);
    }

    const deletePostHandler = async () => {
        await deletePost(props.postID);
        console.log("delete post");
        // TODO: Get delete post working properly
    }

    if (!isOpen) {
        return null;
    } else {
        return (
            <div className={"post-popup-settings-dropdown"}>
                <button className={"post-popup-settings-dropdown-edit"} onClick={() => editPost()}>
                    Edit Post
                </button>
                <button className={"post-popup-settings-dropdown-delete"} onClick={() => deletePostHandler()}>
                    Delete Post
                </button>
            </div>
        );
    }
}
