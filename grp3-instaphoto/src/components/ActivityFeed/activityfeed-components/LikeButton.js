import React from 'react';
import { useEffect } from "react";
import {cancelPostLikeWithToken, incrementPostLikeWithToken, isMyLikePost} from "../../../api/mock_api";

export default function LikeButton(props) {

    const post = props.post;
    const user = props.user;

    const [isLiked, setIsLiked] = React.useState(false);

    useEffect(() => {
        isMyLikePost(post._id, user._id).then((data) => {
            if (isLiked !== data) {
                setIsLiked(data);
            }
        });
    }, [isLiked]);

    const handleLikeClick = () => {
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

    return (
        <div style ={{'margin-top' : '2.3em'}}>
            <button data-testid="button-0" onClick={()=>handleLikeClick()}>
                {isLiked? "unLike":"Like"}
            </button>
            <p data-testid="likeCounter">
                {post.like.length}
            </p>
        </div>
    );
}
