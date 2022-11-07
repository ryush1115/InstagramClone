import React from 'react';
import './post-popup.css';
import { faComment, faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostSettingsDropdown from "./post-settings-dropdown";

export default function PostPopup(props) {

    const [isOpen, setIsOpen] = React.useState(false);

    const post = props.post;

    if (!props.openState) {
        return null;
    } else {
        return (
            <>
                    <div className={"post-popup"}>
                        <div className={"post-popup-header"}>
                            <div className={"post-popup-header-left"}>
                                <div className={"profile-pic"}>
                                    <img src={post.profileImage} alt={"pfp"}/>
                                </div>
                                <div className={"post-header-username"}>
                                    {/* Placeholder div, import user's username later*/}
                                    grp3foreva
                                </div>
                            </div>
                            <div className={"post-popup-header-right"}>
                                <button className={"post-popup-header-right-ellipsis"}>
                                    <FontAwesomeIcon icon={faEllipsis} onClick={() => setIsOpen(!isOpen)}/>
                                    <PostSettingsDropdown openState={isOpen} postID={post.id}/>
                                </button>
                            </div>
                        </div>
                        <div className={"post-popup-body"}>
                            <div className={"post-popup-body-image-box"}>
                                <img className={"post-popup-body-image"} src={post.postImage} alt={"post"}/>
                                {/*Are we not going to have captions for posts?*/}
                                <div className={"post-popup-body-image-caption"}>
                                    {post.postBio}
                                </div>
                            </div>
                            <div className={"post-popup-body-right"}>
                                <div className={"post-popup-likes"}>
                                    <button className={"post-popup-like-button"}>
                                        <FontAwesomeIcon icon={faHeart} className={"post-popup-like-button-icon"}/>
                                        <div className={"post-popup-like-button-text"}>104 likes</div>
                                    </button>
                                </div>
                                <div className={"post-popup-comments"}>
                                    <button className={"post-popup-comments-button"}>
                                        <FontAwesomeIcon icon={faComment} className={"post-popup-comments-button-icon"}/>
                                        <div className={"post-popup-comments-button-text"}>View all 10 comments</div>
                                    </button>
                                    <div className={"post-popup-comments-section"}>
                                        COMMENTS GO HERE COMMENTS GO HERE
                                    </div>
                                </div>
                                <input className={"post-popup-add-comment"} placeholder={"Add Comment..."} />
                            </div>
                        </div>
                    </div>
                <div className={"post-popup-wrapper1"} onClick={props.toggleState}>
                </div>
            </>
        );
    }
}
