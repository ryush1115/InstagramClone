import React, { useState, Fragment, useRef} from "react";
import '../userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const Sidebar =(props)=>{
  console.log("printing create outside of function " + props.create)
  
  const handleCreate = () => {
    props.setCreate(1);
    props.setPostCount(40);
  };

  console.log("printing post count" + props.postCount);

    return (
        <Navbar className='home'>
            
        <Card className='card'>
        <div className = 'logo'>
            <h>Instaphoto&nbsp;</h>
            {/* <img src={require('../images/logo.PNG')} alt="logo" /> */}
            <img alt="logo" />

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
                  <span>
                    Home
                  </span>
                </ListGroupItem>
                <ListGroupItem className='list'>
                  <span onClick = {handleCreate}>
                    Create
                  </span>
                </ListGroupItem>
                <ListGroupItem className='list'>
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
            <button className="show-all-btn">See all</button>
            <div className="profile-card">
                <div>
                    {/* <img className = 'other-user' src={require('../images/grp3.PNG')} alt=""/> */}
                    <img className = 'other-user' alt=""/>

                </div>
                <button className="action-btn" type="button">
                    <span className="username">akikozzm</span>
                    <span className="follow">Follow</span>
                </button>
            </div>
            <div className="profile-card">
                <div>
                    {/* <img className = 'other-user' src={require('../images/grp3.PNG')} alt=""/> */}
                    <img className = 'other-user' alt=""/>

                </div>
                <button className="action-btn" type="button">
                    <span className="username">akikozzm</span>
                    <span className="follow">Follow</span>
                </button>
            </div>
            <div className="profile-card">
                <div>
                    {/* <img className = 'other-user' src={require('../images/grp3.PNG')} alt=""/> */}
                    <img className = 'other-user' alt=""/>

                </div>
                <button className="action-btn" type="button">
                    <span className="username">akikozzm</span>
                    <span className="follow">Follow</span>
                </button>
            </div>
          </div>
        </Card>
      </Navbar>

)  
}

export default Sidebar;