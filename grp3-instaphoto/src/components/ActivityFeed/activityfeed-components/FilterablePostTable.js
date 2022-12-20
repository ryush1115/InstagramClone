import React, { useState,  useEffect, useRef } from "react";
import {  getPosts} from '../../../api/mock_api';
import PostTable from './PostTable'
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from './infinitescroll-components/loader.js';
import EndMsg from './infinitescroll-components/endmsg.js';

export default function FilterablePostTable(props) {
    // Local state to store and update the list of Posts
    const [roster, setRoster] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
    
    const user = props.user;
    
    // ref to indicate if this is the first rendering
    const firstRendering = useRef(true);
    // get the list of [Timeline] Posts from the backend

    console.log("FilterablePostTable.js");
    
    useEffect(() => {
      // get the list of [Timeline] Posts from the backend
      async function fetchData() {
          console.log("FilterablePostTable.js useEffect");
          const data = await getPosts(0);

          console.log("FilterablePostTable.js useEffect data");
          console.log(data);
          console.log(user);

          //for each loop
            for (let i = 0; i < data.length; i++) {
                if (data[i].publicPrivate===false) {
                    if (data[i].username===user) {
                       continue;
                    } else if (user.following.includes(data[i].username)) {
                        continue;
                    } else {
                        data.splice(i, 1);
                        i--;
                    }
                }
            }
            if (roster.length !== data.length) {
                setRoster(data);
            }
      }

      // only load data on the first rendering or
      // when a new post is created
      if (firstRendering.current || props.reload.current) {
        firstRendering.current = false;
        props.reload.current = false; // set reload to false
        fetchData();
      }
    
      setInterval(() => {
        fetchData();
      }, 10000);
    },[]);

    function timeout(delay) {
      return new Promise( res => setTimeout(res, delay) );
    }

    const fetchPosts = async () => {
      const data = await getPosts(page);
      return data;
    };
  
    const fetchData = async () => {
      await timeout(2000);
      const postsFormServer = await fetchPosts();
  
      setRoster([...roster, ...postsFormServer]);
      if (postsFormServer.length === 0 || postsFormServer.length < 3) {
        sethasMore(false);
      }
      setPage(page + 1);
    };




    return (
      // <PostTable posts={roster} />
      <>
      <InfiniteScroll
      dataLength={roster.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<EndMsg />}
      >
      <PostTable user={user} username={user.username} posts={roster} userid ={user._id} userLoginName4 = {props.userLoginName3}/>
      </InfiniteScroll>
      </>

        
    );
}


