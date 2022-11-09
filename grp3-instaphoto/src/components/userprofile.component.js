import React, { useState, useEffect, Fragment} from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import '../userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// import { goToAnchor, configureAnchors } from 'react-scrollable-anchor';
import { getSuggestionList, getUserPosts } from '../api/mock_api';
import GalleryItem from "../components-2/galleryItem";

export default function UserprofileComponent(props) {

    // TODO: Clean up the way we handle navigation
    const navigate = useNavigate();
    const navigateToFriendSuggestion = () => navigate('/friend-suggestion');
    const navigateToFollowingList = () => navigate('/following-list');
    const navigateToCreatePost = () => navigate('/dragdrop');

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
        <Fragment>
            <Navbar className='home'>
                <Card className='card'>
                    <div className = 'logo'>
                        <h>Instaphoto&nbsp;</h>
                        <img alt="logo" />
                        {/* <img src={require('../images/logo.PNG')} alt="logo" /> */}

                    </div>
                    <br></br>
                    <div>
                        <Card.Img
                            // src={require('../images/grp3.PNG')}
                            variant='top'
                            className='sig'
                        />
                        <p className = 'username'> grp3foreva</p>
                    </div>
                    <div>
                        <Card.Body>
                            <Card.Text>
                                <div className='space'></div>
                                <ListGroup variant='flush'>
                                    <ListGroupItem className='list'>
                                        {/* <span className='link' onClick={() => goToAnchor('section1')}> */}
                                        <span>
                    Home
                  </span>
                                    </ListGroupItem>
                                    <ListGroupItem className='list'>
                                        {/* <span className='link' onClick={() => goToAnchor('section2')}> */}
                                        <div className='create-hover'>
                    <span  onClick = {navigateToCreatePost}>
                    Create
                    </span>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className='list'>
                                        {/* <span className='link' onClick={() => goToAnchor('section3')}> */}
                                        <span>
                    Profile
                  </span>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Text>
                        </Card.Body>
                    </div>
                    <br></br>
                    <div className = 'suggestions'>
                        <p className="suggestion-text">Suggestions for you</p>
                        <button className="show-all-btn" onClick={navigateToFriendSuggestion}>See all</button>
                        <div className="profile-card">
                            <div>
                                {/* <img className = 'other-user' src={require('../images/grp3.PNG')} alt=""/> */}
                                <img className = 'other-user' alt=""/>

                            </div>
                            <button className="action-btn" type="button">
                                <span className="username">{FriendSuggestionList[0]}</span>
                                <span className="follow">Follow</span>
                            </button>
                        </div>
                        <div className="profile-card">
                            <div>
                                <img className = 'other-user' alt=""/>
                                {/* <img className = 'other-user' src={require('../images/grp3.png')} alt=""/> */}

                            </div>
                            <button className="action-btn" type="button">
                                <span className="username">{FriendSuggestionList[1]}</span>
                                <span className="follow">Follow</span>
                            </button>
                        </div>
                        <div className="profile-card">
                            <div>
                                <img className = 'other-user' alt=""/>
                                {/* <img className = 'other-user' src={require('../images/grp3.png')} alt=""/> */}

                            </div>
                            <button className="action-btn" type="button">
                                <span className="username">{FriendSuggestionList[2]}</span>
                                <span className="follow">Follow</span>
                            </button>
                        </div>
                    </div>
                </Card>
            </Navbar>

            <header>
                <div className="container">
                    <div className="profile">
                        <div className="profile-image">
                            <img alt=""/>
                            {/* <img src={require('../images/grp3.PNG')} alt=""/> */}
                        </div>
                        <div className="profile-user-settings">
                            <h1 className="profile-user-name">grp3foreva</h1>
                        </div>
                        <div className="profile-stats">
                            <ul>
                                <li><span class="profile-stat-count">39</span> posts</li>
                                <li><span class="profile-stat-count">169</span> followers</li>
                                <li onClick={navigateToFollowingList}>
                                    <span class="profile-stat-count">667 </span>
                                    following
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <div className="container">
                    <div className="gallery">
                        {galleryItems}
                    </div>
                </div>
            </main>

        </Fragment>
    )
}
