import React, { useState, Fragment, useEffect, useRef} from "react";
import '../activityfeed.css';
import '../userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Post from './post.component';
import CreatePost from './createpost.component';
import { getUsers, getUser, createUser, getTimelinePosts, getPosts, createPost } from '../api/mock_api';

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


const ActivityFeedComponent2=()=>{ 
  
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


  

   function PostRow(props) {
    return (
      <tr>
        <Post />
      </tr>
    );
   }


  function PostTable(props) {
    // counter to provide unique key to rows
    const counter = useRef(0);
    let postsList = [];
    let usernameFilter = 'SHOW_ALL';
    // get the list of posts and the username from props

    if (props.username) {
      usernameFilter = props.username;
    }
    postsList = props.posts;

    const makeRows=() => {
      const rows = [];

      postsList.forEach((element) =>{
        // const {post} = element;
        if(usernameFilter === 'SHOW_ALL') {
          rows.push(
            <PostRow post={element}
            key={counter.curret}
            />
          );
        } else {
          if (!element.username.startsWith(usernameFilter)) {
            return;
          }
          rows.push(
            <PostRow post={element}
            key={counter.current}
            />,
          );
        }
        // increment counter
        counter.current += 1;

      });
      return rows;
    };

    const rows = makeRows();
    return(
      <table>
        <tbody>{rows}</tbody>

      </table>

    );
  }
  
  /**
   * Searchbar component
   * pass the username entered as props to its children
   * @param {} props 
   */

  function SearchBar(props) {
    const [username, setUsername] = useState('');
    const handleFilterTextChange = (e) => {
      setUsername(e.target.value);
    }
  }

  /**
   * FilterablePostsTable component
   * This component fetched the list of Posts fromthe
   * backend and pass it as props to its child
   * @param {*} props 
   * @returns FilterablePostsTable elements
   */

  function FilterablePostTable(props) {
    // Local state to store and update the list of Posts
    const [roster, setRoster] = useState([]);
    // ref to indicate if this is the first rendering
    const firstRendering = useRef(true);
    // get the list of posts from the backend
    useEffect(()=>{
      // get the list of posts from the backend
      async function fetchData() {
        const data = await getPosts();
        setRoster(data);
      }

      // only load data on the first rendering or
      // when a new post is created
      if (firstRendering.current || props.reload.current) {
        firstRendering.current = false;
        props.reload.current = false; // set reload to false
        fetchData();
      }

    } )
  }

  function AddPost() {
    // local state new Post
    // we don't need the state variable since we are not passing it as a prop
    // Its child will get the list of Posts from the backend

    const [, setNewPost] = useState(null);

    // Ref variable to tell the FilterablePostTable
    // to load data or not
    const loadData = useRef(false);

    let newUsername;
    let newComment;
    let newPostImage;

    const handleOnChange = (e) => {
      // update fields inside event handlers
      if (e.target.name === 'username') {
        newUsername = e.target.value;
      }

      if (e.target.name === 'comment') {
        newComment = e.target.value;
      }
      if (e.target.name === 'postImage') {
        newPostImage = e.target.value;
        newPostImage = "http://loremflickr.com/640/480";
      }
    }

    const handleCreatePost = async (e) => {
      // stop default behavior to avoid reloading the page
      e.preventDefault();
      const newPost = {username: newUsername, comment: newComment, postImage: newPostImage};

      // clear the form
      const form = document.getElementById('add-post');
      form.reset();

      // send POST request to create the Post
      const newStoredPost = await createPost(newPost);

      // update LoadData
      loadData.current = true;
      // newStoredPost has an id
      // then update state to trigger re-rendering and load 
      // the list of Post (FilterablePostTable) from
      // backend
      setNewPost(newStoredPost);
    };

    return (
      <div>
        {' '}
        <form id='add-post'>
          <input
            type="text"
            name="username"
            placeholder="username..."
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="comment"
            placeholder="comment..."
            onChange={handleOnChange}
          />
          <input
            type="file"
            name="postImage"
            id="postImage"
            onChange={handleOnChange}
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    )
  }


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
          {/* <div className = 'suggestions'>
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
          </div> */}
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

<AddPost />

</header>

<main>
<div class="container">
<div class="feed">
    <div class="feedWrapper">
        <Post/>


    </div>
</div>
</div>    
</main>

</Fragment>
)  
}

export default ActivityFeedComponent2;