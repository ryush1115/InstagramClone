import React, { useState, Fragment, useEffect, useRef} from "react";
import '../activityfeed.css';
import '../userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Post from './post.component';
import FriendBar from './friendbar.component'
import CreatePost from './createpost.component';
import { getUsers, getUser, createUser, getTimelinePosts, getPosts } from '../api/mock_api';

// TO DO: JC
// use map data to render multiple iterations of my Post component
// 1. import the json file (just import it).
// 2. pass the parameters to the post compoennt
// 3. use a map. 


// at row # 117, pass in the data from the above json file, before creating each post


// Qn. 
// How to pass props into Post Component?
// How to use Map to create multiple Posts/ infinity scroll?

// Look at the Student Roster Example






const ActivityFeedComponent=()=>{ 
  
  /*
  // local state to store and update list of posts
  const [roster, setRoster] = useState([]);

  // ref to indicate if this is the first rendering
  const firstRendering = useRef(true);
  // get the list of posts from the backend
  useEffect(() => {
    // get the list of posts from the backend
    async function fetchData() {
      const data = await getPosts();
      setRoster(data);
    }
    // only load data on the first rendering, 
    // or when a new Post is created

    if (firstRendering.current || props.reload.current){
      firstRendering.current = false;
      props.reload.current = false; // set reload to false
      fetchData();
    }
  }); 
  */
  
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
        <Post />
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