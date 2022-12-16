import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import "./edit-post.css";
import { faTag, faPlus, faX} from "@fortawesome/free-solid-svg-icons";
import {Card, ListGroup, ListGroupItem, Navbar} from "react-bootstrap";
import {getPost, updatePost} from "../../../api/mock_api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditPostTagComponent from "./edit-post-tag.component";
import TagAddBox from "./edit-post-tag-add-box.component";

export default function EditPost(props) {

    //TODO: Style this page nicer

    // print out url
    console.log(window.location.href);
    const navigate = useNavigate();
    const navigateToUserProfile = () => navigate('/userprofile');

    const postID = useParams().id;
    console.log(postID);
    const [post, setPost] = useState({});
    const [tags, setTags] = useState([]);
    const [caption, setCaption] = useState("");

    const createTag = (hashtag, color) => {
        if (tags === undefined) {
            setTags([{
                "hashtag": hashtag,
                "color": color
            }]);
        } else {
            if (tags.find(tag => tag.hashtag === hashtag) === undefined) {
                console.log("tags good 1");
                console.log(tags);
                setTags([...tags, {
                    "hashtag": hashtag,
                    "color": color
                }]);
            }
        }
        post.postTagOfOtherUsers = tags;
        setPost(post);
        console.log(post);
    }

    const deleteTag = (hashtag) => {
        const newTags = tags.filter((tag) => tag.hashtag !== hashtag);
        setTags(newTags);
        post.postTagOfOtherUsers = newTags;
        setPost(post);
    }

    const loadTags = () => {
        if (typeof tags !== "undefined") {
            console.log("tags!");
            console.log(tags);
            return tags.map((tag) => {
                return (
                    // Create a tag component for edit page and use it here
                    <EditPostTagComponent hashtag={tag.hashtag} color={tag.color} deleteAction={deleteTag}/>
                );
            });
        }
    }

    // handle Hide Post
    const handleHidePost = async(e) => {

        e.preventDefault();
        console.log("Hide post (*)");
        //const newDeletedPost = await deletePost(props.post._id);
        //console.log(newDeletedPost);
        //update load data
        
        //setDeletedPost(newDeletedPost);
        //loadData.current = true;
        }

    useEffect( () => {
        const fetchPost = async () => {
            const data = await getPost(postID);
            console.log(data[0]);
            setPost(data[0]);
            setTags(data[0].postTagOfOtherUsers);
            setCaption(data[0].postCaption);
            console.log("post1");
            console.log(post);
        };
        fetchPost().catch(console.error);
        console.log("post2");
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
                    <button className={"quit-button"} onClick={() => navigateToUserProfile()}>Quit</button>
                    <button className={"update"} onClick={() => {
                        post.postCaption = caption;
                        post.postTagOfOtherUsers = tags;
                        updatePost(postID, post).then((data) => {
                            console.log("updated");
                            console.log(data);
                            navigateToUserProfile();
                        }).catch(console.error);
                    }}>Update</button>
                </div>
                <div className={"edit-post-body"}>
                    <div className={"edit-image-box"}>
                        <div className={"edit-image"}>
                            <img src={post.postImage} className={"edit-image"} alt={"post"}/>
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
                        <div>
                                <button onClick={handleHidePost} >Hide Post</button>
                            </div>


                        <div className={"edit-image-instruction"}>
                            <FontAwesomeIcon icon={faTag} className={"edit-image-instruction-icon"}/>
                            Tags
                            <FontAwesomeIcon icon={faPlus} className={"add-tag-icon"} onClick={() => {
                                document.getElementsByClassName("tag-add-box")[0].hidden = false;
                            }}/>
                        </div>
                        <div className={"edit-image-tags"}>
                            {loadTags()}
                        </div>
                    </div>
                    <TagAddBox createTag={createTag}/>
                </div>
            </div>
        </>
    );
}
