import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import "./edit-post.css";
import { faUserTag } from "@fortawesome/free-solid-svg-icons";
import {Card, ListGroup, ListGroupItem, Navbar} from "react-bootstrap";
import {getPost, updatePost} from "../../../api/mock_api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function EditPost(props) {

    //TODO: Fix bug where tags are not relative to the image -> Make tag positioning dynamic and relative to the image
    //TODO: Style tags lol
    //TODO: Turn tags into components

    // print out url
    console.log(window.location.href);
    const navigate = useNavigate();
    const navigateToUserProfile = () => navigate('/userprofile');

    const postID = useParams().id;
    console.log(postID);
    const [post, setPost] = useState({});
    const [tags, setTags] = useState([]);
    const [caption, setCaption] = useState("");
    let x = 0;
    let y = 0;
    let picX = 0;
    let picY = 0;

    const tagUser = (e) => {
        picX = e.pageX - e.target.offsetLeft;
        picY = e.pageY - e.target.offsetTop;
        x = e.pageX;
        y = e.pageY;
        const tagbox = document.getElementsByClassName("tag-add-box")[0];
        tagbox.style.left = x + "px";
        tagbox.style.top = y + "px";
        tagbox.hidden = false;
    }

    const createTag = (picX, picY, x, y, username) => {
        if (tags === undefined) {
            setTags([{
                "picX": picX,
                "picY": picY,
                "xPos": x,
                "yPos": y,
                "username": username
            }]);
        } else {
            console.log("tags good 1");
            console.log(tags);
            setTags([...tags, {
                "picX": picX,
                "picY": picY,
                "xPos": x,
                "yPos": y,
                "username": username
            }]);
        }
        post.postTagOfOtherUsers = tags;
        setPost(post);
        console.log(post);
    }

    const loadTags = () => {
        if (typeof tags !== "undefined") {
            console.log("tags!");
            console.log(tags);
            return tags.map((tag) => {
                return (
                    <div className={"user-tag-wrapper"} style={{left: tag.xPos, top: tag.yPos, position: "absolute", background: "white"}}>
                        <FontAwesomeIcon icon={faUserTag} className={"user-tag-icon"}/>
                        <div className={"user-tag-username"}>{tag.username}</div>
                    </div>
                );
            });
        }
    }

    useEffect( () => {
        const fetchPost = async () => {
            const data = await getPost(postID);
            console.log(data);
            setPost(data);
            setTags(data.postTagOfOtherUsers);
            setCaption(data.postCaption);
        };
        fetchPost().catch(console.error);
        console.log("post");
        console.log(post);

        const reloadTags = () => {
            console.log("reload tags");
            loadTags();
        }
        reloadTags();
        }, []);

    console.log(postID);

    return (
        <>
            <div className={"edit-post"}>
                <div className={"edit-post-header"}>
                    <button className={"quit-button"}>Quit</button>
                    <button className={"update"} onClick={() => {
                        post.postCaption = caption;
                        post.postTagOfOtherUsers = tags;
                        updatePost(postID, post).then((data) => {
                            console.log("updated");
                            console.log(data);
                        }).catch(console.error);
                        navigateToUserProfile();
                    }}>Update</button>
                </div>
                <div className={"edit-post-body"}>
                    <div className={"edit-image-box"}>
                        <div className={"edit-image"}>
                            <img src={post.postImage} className={"edit-image"} alt={"post"} onClick={(event) => tagUser(event)}/>
                            {loadTags()}
                        </div>
                        <div className={"edit-image-caption"}>
                            Edit Caption
                            <input className={"edit-caption-box"} type={"text"} readOnly={false} defaultValue={caption} onChange={(event) => {
                                setCaption(event.target.value);
                                post.postCaption = caption;
                                setPost(post);
                                console.log(post);
                            }} />
                        </div>
                        <div className={"edit-image-instruction"}>
                            <FontAwesomeIcon icon={faUserTag} className={"edit-image-instruction-icon"}/>
                            Click anywhere on the photo to tag people
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tag-add-box"} hidden={true}>
                <div className={"tag-add-box-header"}>
                    <button className={"tag-add-box-quit-button"} onClick={() => {
                        const tagbox = document.getElementsByClassName("tag-add-box")[0];
                        tagbox.hidden = true;
                    }}>X</button>
                </div>
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        createTag(picX, picY, x, y, e.target[0].value);
                        document.getElementsByClassName("tag-add-box")[0].hidden = true
                    }
                }>
                    <input className={"tag-add-box-input"} type={"text"} placeholder={"Tag User"}/>
                    <input type={"submit"} value={"Add"} className={"tag-add-box-submit"}/>
                </form>
            </div>
        </>
    );
}
