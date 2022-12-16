import React, { useState, useEffect} from "react";
import './UserProfile/userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {getSuggestionList, getTokenUser, getUserPosts} from '../api/mock_api';

export default function Sidebar(props) {
  const [FriendSuggestionList, setFriendSuggestionList] = useState([]);
  const [user, setUser] = useState({});
  let data;
  const someFetch = async () => {
    //using JS fetch API
    data = await getSuggestionList();
    // assuming the state is in the form of an array
    //console.log(data);
    setFriendSuggestionList(data);
 }


  useEffect(() => {
      someFetch();
      console.log(FriendSuggestionList);
      getTokenUser().then((user) => {
          setUser(user.data);
      });
  },[]);

  const navigate = useNavigate();
  
  const handleCreate = () => {
    props.setCreate(1);
  };

  const navigateToHome = () => {
    navigate('/activity-feed');
  };

  const navigateToProfile = () => {
    navigate('/Userprofile');
  };

  const navigateToSuggestions = () => {
    navigate('/FriendSuggestion');
  };


    return (
        <Navbar className='home'>
            <Card className='card'>
        <div className = 'logo'>
            <h>Instaphoto&nbsp;</h>
            <img src="https://i.ibb.co/VV3Xdf1/logo.png" alt="logo"/>

        </div>
        <br></br>
        <div>
          <Card.Img
            src={user.profilePicture}
            variant='top'
            className='sig'
          />
        <p className = 'username'> {user.username}</p>
        </div>
        <div>
          <Card.Body>
            <Card.Text>
              <div className='space'></div>
              <ListGroup variant='flush'>
                <ListGroupItem className='list'>
                  <span onClick = {navigateToHome}>
                    Home
                  </span>
                </ListGroupItem>
                <ListGroupItem className='list'>
                  <span onClick = {handleCreate}>
                    Create
                  </span>
                </ListGroupItem>
                <ListGroupItem className='list'>
                  <span onClick = {navigateToProfile}>
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
            <button className="show-all-btn" onClick = {navigateToSuggestions}>See all</button>
            <div className="profile-card">
                <div>
                    <img className = 'other-user' src='https://i.ibb.co/hDvzykn/ellipse504.jpg' alt=""/>
                    <img className = 'other-user' alt=""/>

                </div>
                <button className="action-btn" type="button">
                     {/* <span className="username">{FriendSuggestionList[0]}</span>  */}
                    <span className="follow">Follow</span>
                </button>
            </div>
            <div className="profile-card">
                <div>
                    <img className = 'other-user' src='https://i.ibb.co/hDvzykn/ellipse504.jpg' alt=""/>
                    <img className = 'other-user' alt=""/>

                </div>
                <button className="action-btn" type="button">
                    {/* <span className="username">{FriendSuggestionList[1]}</span> */}
                    <span className="follow">Follow</span>
                </button>
            </div>
            <div className="profile-card">
                <div>
                    <img className = 'other-user' src='https://i.ibb.co/hDvzykn/ellipse504.jpg' alt=""/>
                    <img className = 'other-user' alt=""/>

                </div>
                <button className="action-btn" type="button">
                    {/* <span className="username">{FriendSuggestionList[2]}</span> */}
                    <span className="follow">Follow</span>
                </button>
            </div>
          </div>
        </Card>
        </Navbar>
    )
};