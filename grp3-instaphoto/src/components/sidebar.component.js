import React, { useState, Fragment} from "react";
import '../userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const SidebarComponent=()=>{

    
    return (
        <Navbar className='home'>
            
        <Card className='card'>
        <div className = 'logo'>
            <h>Instaphoto&nbsp;</h>
            <img src={require('../images/logo.PNG')} alt="logo" />
        </div>
        <br></br>
        <div>
          <Card.Img
            src={require('../images/grp3.PNG')}
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
          <div className = 'suggestions'>
            <p className="suggestion-text">Suggestions for you</p>
            <button className="show-all-btn">See all</button>
            <div className="profile-card">
                <div>
                    <img className = 'other-user' src={require('../images/grp3.PNG')} alt=""/>
                </div>
                <button className="action-btn" type="button">
                    <span className="username">akikozzm</span>
                    <span className="follow">Follow</span>
                </button>
            </div>
            <div className="profile-card">
                <div>
                    <img className = 'other-user' src={require('../images/grp3.PNG')} alt=""/>
                </div>
                <button className="action-btn" type="button">
                    <span className="username">akikozzm</span>
                    <span className="follow">Follow</span>
                </button>
            </div>
            <div className="profile-card">
                <div>
                    <img className = 'other-user' src={require('../images/grp3.PNG')} alt=""/>
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

export default SidebarComponent;