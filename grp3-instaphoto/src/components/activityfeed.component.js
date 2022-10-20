import React, { useState, Fragment, useEffect, useRef} from "react";
import '../activityfeed.css';
import '../userprofile.css';
import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getUsers, getUser, createUser, getTimelinePosts, getPosts, createPost } from '../api/mock_api';

const ActivityFeedComponent=()=>{

   function PostRow(props) {
    return (
      <tr>
      <div className="post"
          >
          {/* {props.post.username} */}
          <div className="postWrapper">
              <div className="postTop">
                  <div className="postTopLeft">
                      {/* <img
                          className="postProfileImg"
                          src={require('../images/test.png')}
                          alt=""
                      /> */}
                      <span
                          className="postUsername"> {props.post.username}
                      </span>
                  </div>
              </div>

              <div className="postCenter">
                  <img
                  className="postImage"
                  src={props.post.postImage}
                  alt="" />
              </div>

              <div className="postBottom">
                  <div className="postBottomLeft">
                  </div>
                  <form id="commentBox">
                  <label></label>
                      <input type="text" className="commentBox" size="50" placeholder="Enter a comment..."/>
                  </form>
                  <div>
                    {props.post.postComment}
                  </div>
                  <div className="postBottomRight">
                      <span className="postCommentText"> Click for more comments</span>
                  </div>
              </div>
          </div>
      </div>
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
            key={counter.current}
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
    };

    return(
      <div>
        {/* <form>
          <input
            type="text"
            placeholder="filter by username..."
          />
        </form> */}
        <PostTable username={username} posts={props.roster}/>
      </div>
    )
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
    // get the list of Timeline Posts from the backend
    useEffect(()=>{
      // get the list of Timeline Posts from the backend
      async function fetchData() {
        const data = await getTimelinePosts();
        setRoster(data); 
      }

      // only load data on the first rendering or
      // when a new post is created
      if (firstRendering.current || props.reload.current) {
        firstRendering.current = false;
        props.reload.current = false; // set reload to false
        fetchData();
      }

    });

    return (
      <SearchBar roster={roster}/>
    )
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
    let newPostComment;
    let newPostImage = "http://loremflickr.com/640/480"; // default to this image for HW2

    const handleOnChange = (e) => {
      // update fields inside event handlers
      if (e.target.name === 'username') {
        newUsername = e.target.value;
      }

      if (e.target.name === 'comment') {
        newPostComment = e.target.value;
      }
      if (e.target.name === 'postImage') {
        newPostImage = e.target.value;
        newPostImage = `http://loremflickr.com/640/480`;
      }
    }

    const handleCreatePost = async (e) => {
      // stop default behavior to avoid reloading the page
      e.preventDefault();
      // create new Post variable
      const newPost = {username: newUsername, postImage: newPostImage, postComment: newPostComment, publicPrivate:false, postTagOfOtherUsers:null, id:10};
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


    /**
     * <form id='add-post' onSubmit={handleCreatePost}>
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
     */

    return (
      <div>
        {' '}
        <FilterablePostTable reload={loadData}/>
        <div>
        </div>
      </div>
    )
  }

  return (
    <Fragment>        
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
    <AddPost />
    </div>
</div>
</div>
</main>
</Fragment>
)
}
export default ActivityFeedComponent;
