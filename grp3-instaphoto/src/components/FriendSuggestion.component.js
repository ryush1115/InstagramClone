import React, { useState, Fragment, useRef, useContext } from "react";
import { Navbar, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactDOM from "react-dom";
import '../FriendSuggestion.css';
// import ellipse507 from "../images/ellipse507.png";
// import ellipse504 from "../images/ellipse504.png";
// import ellipse505 from "../images/ellipse505.png";
// import ellipse508 from "../images/ellipse508.png";
// import ellipse5041 from "../images/ellipse5041.png";
// import ellipse506 from "../images/ellipse506.png";
import FriendSuggestionComponent from "./FriendSuggestionComponent"
import {sendFriendSuggestionList, }from '../api/mock_api';
const FriendSuggestion = () => {
  const [buttonText, setButtonText] = useState('Follow');
  const [Following, setFollowing] = useState(false);
  const [FriendSuggestionList, setFriendSuggestionList] = useState([{ name: "Akikos", image: null, description: "This is a cool person", isfollowed: false }]);
//pull the list of users from the backend
  // useEffect(()=>{
  //   async function fetchData(){
  //     const data = await getList
  //   }
  // },[])
  // useEffect(()=>{
  //   // get the list of posts from the backend
  //   async function fetchData() {
  //     const data = await getPosts();
  //     setRoster(data); 
  //   }
  // use a use state on a list. each element in the list should have a attribute of 
  // whether you have followed this person.
  // show it with a map (see Eric's mocked backend example)


  return (
    <Fragment>
      <Navbar className='home'>

        <Card className='card'>
          <div className='logo'>
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
            <p className='username'> grp3foreva</p>
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
                    <span>
                      Create
                    </span>
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
          <div className='suggestions'>
            <p className="suggestion-text">Suggestions for you</p>
            <button className="show-all-btn">See all</button>
            <div className="profile-card">
              <div>
                <img className='other-user' alt="" />
                {/* <img className='other-user' src={require('../images/grp3.PNG')} alt="" /> */}

              </div>
              <button className="action-btn" type="button">
                <span className="username">akikozzm</span>
                <span className="follow">Follow</span>
              </button>
            </div>
            <div className="profile-card">
              <div>
                <img className='other-user' alt="" />
                {/* <img className='other-user' src={require('../images/grp3.PNG')} alt="" /> */}

              </div>
              <button className="action-btn" type="button">
                <span className="username">akikozzm</span>
                <span className="follow">Follow</span>
              </button>
            </div>
            <div className="profile-card">
              <div>
                <img className='other-user' alt="" />
                {/* <img className='other-user' src={require('../images/grp3.PNG')} alt="" /> */}
              </div>
              <button className="action-btn" type="button">
                <span className="username">akikozzm</span>
                <span className="follow">Follow</span>
              </button>
            </div>
          </div>
        </Card>
      </Navbar>

      <div>

      </div>



      <div className="container-0_FriendSuggestion">
        <span className="text-0_FriendSuggestion">Suggested</span>
        {FriendSuggestionList.map(v=>{
          return <FriendSuggestionComponent name={v.name} description={v.description} image = {v.image} isfollowed={v.isfollowed}/>
        })}
      </div>

    </Fragment>
  );
}

export default FriendSuggestion;