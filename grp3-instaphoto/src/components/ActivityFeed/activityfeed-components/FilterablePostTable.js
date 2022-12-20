import React, { useState,  useEffect, useRef } from "react";
import {  getPosts, getPostsAll} from '../../../api/mock_api';
import PostTable from './PostTable'
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from './infinitescroll-components/loader.js';
import EndMsg from './infinitescroll-components/endmsg.js';

export default function FilterablePostTable(props) {
    // Local state to store and update the list of Posts
    const [roster, setRoster] = useState([]);
    const[page, setPage]  = useState(0);
    const [hasMore, sethasMore] = useState(true);

    const user = props.user;
    
    // ref to indicate if this is the first rendering
    const firstRendering = useRef(true);
    // get the list of [Timeline] Posts from the backend

    // console.log("FilterablePostTable.js");
    
    useEffect(() => {
      // get the list of [Timeline] Posts from the backend
      async function fetchData() {
          console.log("FilterablePostTable.js useEffect");
          const data = await getPostsAll(page); // maybe we should make a different API call that loads everything, except of skipping for the 10 second refreshes? How will that affect where the cursor is?
          console.log('data length is', data.length, "with page", page);
          // console.log("FilterablePostTable.js useEffect data");
          // console.log(data);
          // console.log(user);

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
      }, 5000);
    },[]);

    function timeout(delay) {
      return new Promise( res => setTimeout(res, delay) );
    }

    const fetchNewData = async () => {
      await timeout(2000);
      setPage(page+1);
      console.log("new page is ", page);
      const newData = await getPosts(page);
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].publicPrivate===false) {
            if (newData[i].username===user) {
               continue;
            } else if (user.following.includes(newData[i].username)) {
                continue;
            } else {
                newData.splice(i, 1);
                i--;
            }
        }
    }
      setRoster([...roster, ...newData]);
      if (newData.length === 0 || newData.length < 3) {
        sethasMore(false);
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
        <PostTable user={user} username={user.username} posts={roster} userid ={user._id} userLoginName4 = {props.userLoginName3}/>
        </InfiniteScroll>
    );
}

