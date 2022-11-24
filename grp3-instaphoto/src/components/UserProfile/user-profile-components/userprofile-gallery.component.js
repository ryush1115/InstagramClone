import React, { useState, useEffect, Fragment} from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import '../userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// import { goToAnchor, configureAnchors } from 'react-scrollable-anchor';
import { getSuggestionList, getUserPosts } from '../../../api/mock_api';
import GalleryItem from "./galleryItem";
// import Sidebar from '../../sidebar.component'

export default function UserprofileComponent(props) {

    const [FriendSuggestionList, setFriendSuggestionList] = useState([]);
    const [userPosts, setUserPosts] = useState([]);

    useEffect( () => {
        const fetchUserPosts = async () => {
            const data = await getUserPosts(props.userName);
            console.log("userposts123");
            console.log(data);
            setUserPosts(data);
        };

        const fetchFriendSuggestions = async () => {
            const data = await getSuggestionList();
            setFriendSuggestionList(data);
        }

        fetchUserPosts().catch(console.error);
        fetchFriendSuggestions().catch(console.error);
    },[]);

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
