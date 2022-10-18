import React, { useState, Fragment} from "react";
import '../activityfeed.css';
import '../userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Post from './post.component';
import FriendBar from './friendbar.component'
import CreatePost from './createpost.component';

// use map data to render multiple iteratesion of my Post component
// 1. import the json file (just import it).
// 2. pass the parameters to the post compoennt
// 3. use a map. 


// at row # 117, pass in the data from the above json file, before creating each post

const ActivityFeedComponent=()=>{
    
  


  
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

      <header>

<div class="container">
    <div class="profile">
        <div class="profile-image">
            <img src={require('../images/grp3.PNG')} alt=""/>
        </div>
        <div class="profile-user-settings">
            <h1 class="profile-user-name">grp3foreva</h1>
        </div>
    </div>
</div>
</header>



<main>
<div class="container">
<div class="feed">
    <div class="feedWrapper">
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>

    </div>
</div>
</div>    
</main>

</Fragment>


    )  
}

export default ActivityFeedComponent;