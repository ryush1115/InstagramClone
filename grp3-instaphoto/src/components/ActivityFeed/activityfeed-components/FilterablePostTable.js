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

    const user = props.user;

    let postsLength = useRef(0);
    const MINUTE_MS = 10000;

    const [newPosts, setNewPosts] = useState(false);

    useEffect(() => {
      // get the list of [Timeline] Posts from the backend
      async function fetchData() {

          let posts = await getPostsAll(page);
          console.log("Fetching first data");
          console.log(posts);
          console.log(posts.length);

          for (let i = 0; i < posts.length; i++) {
              if (posts[i].publicPrivate===false) {
                  if (posts[i].username === user.username) {
                      continue;
                  } else if (user.following.includes(posts[i].username)) {
                      console.log("following");
                      console.log(posts[i]);
                      continue;
                  } else {
                      posts.splice(i, 1);
                      i--;
                  }
              }
          }

          console.log(posts);
          console.log(posts.length);

          postsLength.current = posts.length;

          console.log("FilterablePostTable.js useEffect");
          let data = await getPostsAll(page);
          console.log('data length is', data.length, "with page", page);

          //for each loop
            for (let i = 0; i < data.length; i++) {
                if (data[i].publicPrivate===true) {
                    if (data[i].username === user.username) {
                       continue;
                    } else if (user.following.includes(data[i].username)) {
                        continue;
                    } else {
                        data.splice(i, 1);
                        i--;
                    }
                }
            }
            setRoster(roster.concat(data));
      }
      fetchData();



      const interval = setInterval(async () => {
          console.log("FilterablePostTable.js useEffect setInterval");
          const data = await getPostsAll(page);
          let posts = data.data;
          for (let i = 0; i < posts.length; i++) {
              if (posts[i].publicPrivate===false) {
                  if (posts[i].username === user.username) {
                      continue;
                  } else if (user.following.includes(posts[i].username)) {
                      continue;
                  } else {
                      posts.splice(i, 1);
                      i--;
                  }
              }
          }
          console.log(posts.length);
          if (postsLength.current !== posts.length) {
                setNewPosts(true);
          }
      }, MINUTE_MS);

      return () => clearInterval(interval);
    },[]);

    function timeout(delay) {
      return new Promise( res => setTimeout(res, delay) );
    }

    const fetchNewData = async () => {
      await timeout(2000);
      setPage(page+1);
      console.log("new page is ", page);
      let newData = await getPosts(page);
      console.log("new data is ", newData);
      for (let i = 0; i < newData.length; i++) {
        if (newData.data[i].publicPrivate===false) {
            if (newData.data[i].username===user) {
               continue;
            } else if (user.following.includes(newData.data[i].username)) {
                continue;
            } else {
                newData.splice(i, 1);
                i--;
            }
        }
    }
    if (newData.data.length === 0 || newData.data.length < 3) {
      setHasMore(false);
      return;
    }
      setRoster(roster.concat(newData.data));
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

