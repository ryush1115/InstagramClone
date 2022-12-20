import React, {useEffect} from 'react';
import './post-popup.css';
import { faComment, faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostSettingsDropdown from "./post-settings-dropdown";
import PostPopupTag from "./post-popup-tag.component";
import {cancelPostLikeWithToken, getTokenUser, incrementPostLikeWithToken, isMyLikePost} from "../../../api/mock_api";

export default function PostPopup(props) {

    const [isOpen, setIsOpen] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false);

    // TODO: Break this into smaller components

    useEffect(() => {
        getTokenUser().then((user) => {
            isMyLikePost(props.post._id, user.data._id).then((data) => {
                setIsLiked(data);
            });
        });
    }, [isLiked]);

    const post = props.post;

    const loadTags = () => {
        if (post.postTagOfOtherUsers.length > 0) {
            console.log("Loading tags")
            console.log(post.postTagOfOtherUsers);
            return post.postTagOfOtherUsers.map((tag) => {
                return <PostPopupTag color={tag.color} hashtag={tag.hashtag} />
            })
        } else {
            return <div className={"no-tags-text"}>No tags</div>
        }
    }

    const loadComments = () => {
        if (post.postCommentArray.length > 0) {
            return post.postCommentArray.map((comment) => {
                return (
                <div className={"comment"}>
                    <span className={"comment-username"}>{comment.username}</span>
                    <span className={"comment-text"}>{comment.message}</span>
                </div>
                );
            })
        } else {
            return <div className={"no-comments-text"}>No comments</div>
        }
    }

    const handleLike = () => {
        if (isLiked) {
            setIsLiked(false);
            cancelPostLikeWithToken(post._id);
            post.like.length--;
        } else {
            setIsLiked(true);
            incrementPostLikeWithToken(post._id);
            post.like.length++;
        }
    }

    const createComment = () => {
        console.log("Create comment");
    }

    const loadSettings = () => {
        if (!window.location.pathname.match(/^\/user-profile\/[a-zA-Z0-9]+$/) &&
            !window.location.pathname.match(/^\/user\/[a-zA-Z0-9]+$/)) {
            console.log("Loading settings");
            return (
                <button className={"post-popup-header-right-ellipsis"}>
                    <FontAwesomeIcon icon={faEllipsis} onClick={() => setIsOpen(!isOpen)}/>
                    <PostSettingsDropdown openState={isOpen} postID={post._id}/>
                </button>
            );
        }
    }

    if (!props.openState) {
        return null;
    } else {
        return (
            <>
                    <div className={"post-popup"}>
                        <div className={"post-popup-header"}>
                            <div className={"post-popup-header-left"}>
                                <div className={"post-header-username"}>
                                    {post.username}
                                </div>
                            </div>
                            <div className={"post-popup-header-right"}>
                                {loadSettings()}
                            </div>
                        </div>
                        <div className={"post-popup-body"}>
                            <div className={"post-popup-body-image-box"}>
                                <img className={"post-popup-body-image"} src={post.postImage} alt={"post"}/>
                                <div className={"post-popup-body-image-caption"}>
                                    {post.postCaption}
                                </div>
                            </div>
                            <div className={"post-popup-body-right"}>
                                <div className={"post-popup-likes"}>
                                    <button className={"post-popup-like-button"} onClick={() => handleLike()}>
                                        <FontAwesomeIcon icon={faHeart} className={"post-popup-like-button-icon"}/>
                                        <div className={"post-popup-like-button-text"}>{post.like.length} likes</div>
                                    </button>
                                </div>
                                <div className={"post-popup-comments"}>
                                    <button className={"post-popup-comments-button"}>
                                        <FontAwesomeIcon icon={faComment} className={"post-popup-comments-button-icon"}/>
                                        <div className={"post-popup-comments-button-text"}>View all {post.postCommentArray.length} comments</div>
                                    </button>
                                    <div className={"post-popup-comments-section"}>
                                        {loadComments()}
                                    </div>
                                </div>
                                <input className={"post-popup-add-comment"} placeholder={"Add Comment..."} />
                            </div>
                        </div>
                        <div className={"post-popup-footer"}>
                            <div className={"post-popup-tags"}>
                                {loadTags()}
                            </div>
                        </div>
                    </div>
                <div className={"post-popup-wrapper1"} onClick={props.toggleState}>
                </div>
            </>
        );
    }
}
