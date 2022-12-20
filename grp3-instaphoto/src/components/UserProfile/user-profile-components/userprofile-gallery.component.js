import React, { useState, useEffect, Fragment} from "react";
import '../userprofile.css';
import {getSuggestionList, getTokenUser, getUserPosts} from '../../../api/mock_api';
import GalleryItem from "./galleryItem";

export default function UserprofileComponent(props) {

    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        if (!!props.user) {
            const user = props.user.data;
            getUserPosts(user.username).then((posts) => {
                setUserPosts(posts);
            });
        } else {
            getTokenUser().then((user) => {
                if (user.status === 401) {
                    console.log("not signed in");
                    sessionStorage.removeItem("token");
                    window.location.href = "/sign-in";
                } else {
                    console.log(user.data);
                    getUserPosts(user.data.username).then((posts) => {
                        setUserPosts(posts);
                    });
                }
            });
        }
    }, []);


    const galleryItems = userPosts.map((post) => {
        return <GalleryItem key={post.id} post={post} />
    });

    return (
        <>
            <main>
                <div className="container">
                    <div className="gallery">
                        {galleryItems}
                    </div>
                </div>
            </main>
        </>
    )
}
