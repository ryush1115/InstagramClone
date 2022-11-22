import React from 'react';
import PostPopup from "../post-popup/post-popup";

export default function GalleryItem(props) {

    const [isOpen, setIsOpen] = React.useState(false);

    const togglePopupState = () => {
        setIsOpen(!isOpen);
    }

    // Our GalleryItem should contain information about the post it represents
    const post = props.post;

    return (
        <div className="gallery-item">
            <img className={"gallery-image"} src={post.postImage} alt={"123"} onClick={togglePopupState} />
            <PostPopup post={post} openState={isOpen} toggleState={togglePopupState}/>
        </div>
    );
}
