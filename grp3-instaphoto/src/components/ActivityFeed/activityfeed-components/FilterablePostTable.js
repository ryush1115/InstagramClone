import React, { useState,  useEffect, useRef } from "react";
import SearchBar from './SearchBar';
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
    const firstRendering = useRef(true);
    
    useEffect(() => {
      // get the list of [Timeline] Posts from the backend
      async function fetchData() {
        const data = await getPosts(0);
        console.log("getPosts data: ");
        console.log(data);
        setRoster(data);
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
    },[roster]);

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
      <SearchBar roster={roster} userLoginName3={props.userLoginName2}/>
      </InfiniteScroll>
      </>

    );
}


