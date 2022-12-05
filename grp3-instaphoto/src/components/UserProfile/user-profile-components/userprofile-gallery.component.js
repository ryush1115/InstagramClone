import React, { useState, useEffect, Fragment} from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import '../userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// import { goToAnchor, configureAnchors } from 'react-scrollable-anchor';
import {getSuggestionList, getTokenUser, getUserPosts} from '../../../api/mock_api';
import GalleryItem from "./galleryItem";
// import Sidebar from '../../sidebar.component'

export default function UserprofileComponent(props) {

    const [FriendSuggestionList, setFriendSuggestionList] = useState([]);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        getTokenUser().then((user) => {
            console.log(user.data);
            getUserPosts(user.data.username).then((posts) => {
                setUserPosts(posts);
            });
        });
        const fetchFriendSuggestions = async () => {
            const data = await getSuggestionList();
            setFriendSuggestionList(data);
        }
        fetchFriendSuggestions().catch(console.error);
    }, []);

    const galleryItems = userPosts.map((post) => {
        return (
            <GalleryItem post={post} />
        );
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
