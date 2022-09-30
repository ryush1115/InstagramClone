import React, { useState } from "react";
import '../userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// import { goToAnchor, configureAnchors } from 'react-scrollable-anchor';


const UserprofileComponent=()=>{
    return (
        <Navbar className='home'>
        <Card className='card'>
          <Card.Img
            src={require('../images/test.png')}
            variant='top'
            className='sig'
          />

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
                    About
                  </span>
                </ListGroupItem>
                <ListGroupItem className='list'>
                  {/* <span className='link' onClick={() => goToAnchor('section3')}> */}
                  <span>
                    Portfolio
                  </span>
                </ListGroupItem>
                <ListGroupItem className='list'>
                  {/* <span className='link' onClick={() => goToAnchor('section4')}> */}
                  <span>
                    Contact
                  </span>
                </ListGroupItem>
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      </Navbar>
    )  
}

export default UserprofileComponent;