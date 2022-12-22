import React, { useState,  useEffect, useRef } from "react";
import {  getPosts, getPostsAll} from '../../../api/mock_api';
import PostTable from './PostTable'
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from './infinitescroll-components/loader.js';
import EndMsg from './infinitescroll-components/endmsg.js';
import NewPostAlert from "./NewPostAlert";

export default function FilterablePostTable(props) {
    // Local state to store and update the list of Posts
    const [roster, setRoster] = useState([]);
    const [page, setPage]  = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [hasMoreInd, setHasMoreInd] = useState(true);

    const user = props.user;

    let postsLength = useRef(0);
    const MINUTE_MS = 10000;

    const [newPosts, setNewPosts] = useState(false);

    useEffect(() => {
      // get the list of [Timeline] Posts from the backend
      async function fetchData() {

          let posts = await getPostsAll(page);
          console.log("Fetching first data");
          console.log("printing posts", posts[0]);
          console.log("printing posts", posts[1]);
          console.log("printing posts", posts[2]);
          
          console.log("printing posts", posts[0].username);
          console.log("printing followers", user.following);
          const newPosts = [];
          for (let i = 0; i < posts.length; i++) {
              if (posts[i].publicPrivate===true) {
                  if (posts[i].username === user.username) {
                      newPosts.push(posts[i]);
                      continue;
                  } else if (user.following.includes(posts[i].username)) {
                      newPosts.push(posts[i]);
                      continue;
                  } else {
                    console.log("im filtering");
                      posts.splice(i, 1);
                      i--;
                  }
              }
          }

          console.log("posts after filtering", newPosts);
          console.log(newPosts.length);

          postsLength.current = newPosts.length;

          console.log("FilterablePostTable.js useEffect");
          let data = await getPostsAll(page);
          console.log('data length is', data.length, "with page", page);
          console.log('public private', data[0].publicPrivate);

          //for each loop
          const newData = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].publicPrivate===true) {
                    if (data[i].username === user.username) {
                        newData.push(data[i]);
                       continue;
                    } else if (user.following.includes(data[i].username)) {
                        newData.push(data[i]);
                        continue;
                    } else {
                        console.log("im filtering");
                        data.splice(i, 1);
                        i--;
                    }
                }
            }
            console.log("data after new filtering is ", newData);
            setRoster(roster.concat(newData));
      }
      fetchData();



      const interval = setInterval(async () => {
          console.log("FilterablePostTable.js useEffect setInterval");
          const data = await getPostsAll(page);
          let posts = data;
          const intervalPosts = [];
          
          for (let i = 0; i < posts.length; i++) {
              if (posts[i].publicPrivate===true) {
                  if (posts[i].username === user.username) {
                      intervalPosts.push(posts[i]);
                      continue;
                  } else if (user.following.includes(posts[i].username)) {
                      intervalPosts.push(posts[i]);
                      continue;
                  } else {
                      posts.splice(i, 1);
                      i--;
                  }
              }
          }
          console.log(intervalPosts.length);
          if (postsLength.current !== intervalPosts.length) {
                setNewPosts(true);
          }
      }, MINUTE_MS);

      return () => clearInterval(interval);
    },[]);

    function timeout(delay) {
      return new Promise( res => setTimeout(res, delay) );
    }

    let newPage = 0;
      
    const fetchNewData = async () => {
      await timeout(2000);
      setPage(page+1);
      newPage = newPage+ 1;
      console.log("new page is ", page+newPage);
      let newData = await getPosts(page+newPage);
      console.log("new data is ", newData.data[0].username);
      const newPosts = [];
      newData = newData.data;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].publicPrivate===true) {
            if (newData[i].username===user.username) {
                console.log("it should be going here");
                newPosts.push(newData[i]);
               continue;
            } else if (user.following.includes(newData[i].username)) {
                newPosts.push(newData[i]);
                continue;
            } else {
                newData.splice(i, 1);
                i--;
            }
        }
    }

    console.log("printing in infinite loop", newPosts);
    
    let counter = 0;
    while (newPosts.length === 0){
        console.log("i'm entering this loop?");
        fetchNewData();
        counter ++;
        if (counter >7) {
            break;
        }
    }

    
    console.log("printing in infinite loop roster", newPosts.length);
    const setPosts = [...roster, ...newPosts];
    setRoster(setPosts);
    
    if (newPosts.length === 0 || newPosts.length < 3) {
        console.log("entering end statement");
        await timeout(3000);  
      setHasMore(false);
      return;
    }
    };

    return (
      <InfiniteScroll
      dataLength={roster.length} //This is important field to render the next data
      next={fetchNewData}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<EndMsg />}
      >
          {newPosts ? <NewPostAlert /> : null}
        <PostTable user={user} posts={roster} />
        </InfiniteScroll>
    );
}

