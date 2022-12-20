import React, { useState,  useEffect, useRef } from "react";
import {  getPosts} from '../../../api/mock_api';
import PostTable from './PostTable'

export default function FilterablePostTable(props) {
    // Local state to store and update the list of Posts
    const [roster, setRoster] = useState([]);

    const user = props.user;
    
    // ref to indicate if this is the first rendering
    const firstRendering = useRef(true);
    // get the list of [Timeline] Posts from the backend

    console.log("FilterablePostTable.js");
    
    useEffect(() => {
      // get the list of [Timeline] Posts from the backend
      async function fetchData() {
          console.log("FilterablePostTable.js useEffect");
          const data = await getPosts();

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

    return (
        <PostTable user={user} username={user.username} posts={roster} userid ={user._id} userLoginName4 = {props.userLoginName3}/>
    );
}


