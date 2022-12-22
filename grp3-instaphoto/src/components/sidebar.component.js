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
    if (data.status === 200) {
        setFriendSuggestionList(data);
    } else if (data.status === 401){
        console.log("error");
        sessionStorage.removeItem("token");
        window.location.href = "/sign-in";
    }
 }

  useEffect(() => {
      someFetch();
      console.log(FriendSuggestionList);
      getTokenUser().then((user) => {
          if (user.status === 401) {
                console.log("not signed in");
                sessionStorage.removeItem("token");
                window.location.href = "/sign-in";
          } else {
              setUser(user.data);
          }
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


  if (!!user) {
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
              </Card>
          </Navbar>
      )
  } else {
      sessionStorage.removeItem("token");
      window.location.href = "/sign-in";
  }
};