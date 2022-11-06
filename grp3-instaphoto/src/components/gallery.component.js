/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect, useRef } from "react";
import './userprofile.css';
import {getPosts} from '../api/mock_api';

const Gallery = ({postCount, setPostCount}) => {
  function PostRow(props) {
    return (
      <tr>
        <div className="gallery">
          <div className="wrapper">
              <img
                className="gallery-image-one"
                src={props.postOne}
                id="gallery image one" />
                <img
                className="gallery-image-two"
                src={props.postTwo}
                id="gallery image two" />
                <img
                className="gallery-image-three"
                src={props.postThree}
                id="gallery image three" />
          </div>
        </div>
      </tr>
    );
  }

  function PostTable({username, posts}) {
    // counter to provide unique key to rows
    const counter = useRef(0);
    const postsList = useRef([]);
    let totalRows = [];
    let allPosts = [];
    //const allPosts = [];
    //const [posts,] = useState(props.posts);
    // allPosts = props.posts;
    // console.log(allPosts.length);
    
    

    const someFetch = async () => {
      allPosts = await getPosts();
      // console.log(allPosts);
      if (allPosts.length > 0){
        allPosts.forEach((element) => {
            // console.log(element.username);
            if (element.username === 'grp3foreva') {
                postsList.current.push(element);
            }
        });
      }
      // console.log(postsList.current);
      setPostCount(postsList.current.length); 
    }


    useEffect(() => {
      someFetch();
    },[]);

      //setPostCount(20);  
      // setPostCount(postsList.length);  #this option goes crazy
    // }
    // console.log("Post count is " + postCount);
    // postsList = props.posts;
    // console.log(postsList);
    postsList.current = postsList.current.reverse();
    if (postsList.current.length > 0){
        for (let i = 0; i < postsList.current.length; i = i+3) {
            let postsThree = [];
            if (postsList.current[i] !== undefined){
                postsThree.push(postsList.current[i].postImage);            
                i+=1;
            }
            if (postsList.current[i] !== undefined){
                postsThree.push(postsList.current[i].postImage);            
                i+=1;
            }
            if (postsList.current[i] !== undefined){
                postsThree.push(postsList.current[i].postImage);            
                i+=1;
            }
            
            const makeRows = () => {
                let rows = [];

                rows.push(
                    <PostRow 
                      postOne={postsThree[0]}
                      postTwo={postsThree[1]}
                      postThree={postsThree[2]}

                      key={counter.current}
                      counter = {counter.current}
                    />
                  )
                return rows;
            }
            
            let rows = makeRows();
            totalRows.push(rows);
            
          }
          return (
            <table>
              <tbody>{totalRows}</tbody>
            </table>
          );
        }
    }

  /**
   * Searchbar component
   * pass the username entered as props to its children
   * @param {} props
   */

  function SearchBar(props) {
    const [username, setUsername] = useState('');

    return (
      <div>
        {/* <form>
          <input
            type="text"
            placeholder="filter by username..."
          />
        </form> */}
        <PostTable username={username} posts={props.roster} />
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

  function FilterablePostTable({reload}) {
    // Local state to store and update the list of Posts
    const [roster, setRoster] = useState([]);
    // ref to indicate if this is the first rendering
    const firstRendering = useRef(true);
    // get the list of [Timeline] Posts from the backend
    useEffect(() => {
      // get the list of [Timeline] Posts from the backend
      async function fetchData() {
        const data = await getPosts();
        setRoster(data);
      }

      // only load data on the first rendering or
      // when a new post is created
      if (firstRendering.current || reload.current) {
        firstRendering.current = false;
        
        reload.current = false; // set reload to false
        fetchData();
      }

    });

    return (
      <SearchBar roster={roster} />
    )
  }

  function AddPost() {
    const loadData = useRef(false);
    // console.log("inside add post " + postCount);
    return (
      <div>
        {' '}
        <FilterablePostTable reload={loadData} />
        <div>
        </div>
      </div>
    )
  }

  return (
      <main>
        <div className="gallery">
              <AddPost />
        </div>
      </main>
  )
}
export default Gallery;
