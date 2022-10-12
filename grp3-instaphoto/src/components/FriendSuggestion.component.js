import React, { useState, Fragment, useRef, useContext} from "react";
import { Navbar, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import '../FriendSuggestion.css';
import ellipse507 from "../images/ellipse507.png";
import ellipse504 from "../images/ellipse504.png";
import ellipse505 from "../images/ellipse505.png";
import ellipse508 from "../images/ellipse508.png";
import ellipse5041 from "../images/ellipse5041.png";
import ellipse506 from "../images/ellipse506.png";

function FriendSuggestion (){  
    return (
        <Fragment>
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

        <div>

        </div>

        

<div className="container-0">
      <span className="text-0">Suggested</span>
      <div className="container-1">
        <img className="image-0" src={ellipse504} />
        <div className="container-2">
          <div className="container-3">
            <span className="text-1">akikozzm</span>
            <span className="text-2">Cool Person</span>
          </div>
          <div className="container-4">
            <span className="text-3">Following</span>
          </div>
        </div>
      </div>
      <div className="container-5">
        <img className="image-1" src={ellipse505} />
        <div className="container-6">
          <div className="container-7">
            <span className="text-4">someoneelse</span>
            <span className="text-5">ZZ Akiko</span>
          </div>
          <div className="container-8">
            <span className="text-6">Follow</span>
          </div>
        </div>
      </div>
      <div className="container-9">
        <img className="image-2" src={ellipse506} />
        <div className="container-10">
          <div className="container-11">
            <span className="text-7">Mannnnnnnn1</span>
            <span className="text-8">Sporty Guy</span>
          </div>
          <div className="container-12">
            <span className="text-9">Follow</span>
          </div>
        </div>
      </div>
      <div className="container-13">
        <img className="image-3" src={ellipse507} />
        <div className="container-14">
          <div className="container-15">
            <span className="text-10">highighighhuang</span>
            <span className="text-11">Not so low</span>
          </div>
          <div className="container-16">
            <span className="text-12">Follow</span>
          </div>
        </div>
      </div>
      <div className="container-17">
        <img className="image-4" src={ellipse508} />
        <div className="container-18">
          <div className="container-19">
            <span className="text-13">anytimeisnaptime</span>
            <span className="text-14">Celebrity Cat 123</span>
          </div>
          <div className="container-20">
            <span className="text-15">Follow</span>
          </div>
        </div>
      </div>
      <div className="container-21">
        <img className="image-5" src={ellipse5041} />
        <div className="container-22">
          <div className="container-23">
            <span className="text-16">TigerMom123</span>
            <span className="text-17">Lin</span>
          </div>
          <div className="container-24">
            <span className="text-18">Follow</span>
          </div>
        </div>
      </div>
    </div>

        </Fragment>
      );
}

export default FriendSuggestion;