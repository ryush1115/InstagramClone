import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import "./edit-post.css";
import { faUserTag } from "@fortawesome/free-solid-svg-icons";
import {Card, ListGroup, ListGroupItem, Navbar} from "react-bootstrap";
import {getPost} from "../../api/mock_api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function EditPost(props) {

    const postID = useParams().id;
    const [post, setPost] = useState({});

    const tagUser = (e) => {
        const x = e.screenX;
        const y = e.screenY;
        console.log(createTag(x, y));
    }

    const createTag = (x, y) => {
        // TODO: Create a tag object and associate it with some x and y position on the post image (not the screen!)
        // TODO: Add the tag to the post object
        // TODO: Make sure the tag has a reference to a username/userid
    }

    useEffect( () => {
        const fetchPost = async () => {
            const data = await getPost(postID);
            console.log(data);
            setPost(data);
        };
        fetchPost().catch(console.error);
    }, []);

    console.log(postID);

    return (
        <>
            <div className={"edit-post"}>
                <div className={"edit-post-header"}>
                    <button className={"quit-button"}>quit</button>
                    <button className={"update"}>update</button>
                </div>
                <div className={"edit-post-body"}>
                    <div className={"edit-image-box"}>
                        <img src={post.postImage} className={"edit-image"} alt={"post"} onClick={(event) => tagUser(event)}/>
                        <div className={"edit-image-instruction"}>
                            <FontAwesomeIcon icon={faUserTag} className={"edit-image-instruction-icon"}/>
                            Click anywhere on the photo to tag people
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
