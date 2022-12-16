import React, { useState,  useEffect, useRef } from "react";
import SearchBar from './SearchBar';
import {  getPosts} from '../../../api/mock_api';
import PostTable from './PostTable'

export default function FilterablePostTable(props) {
    // Local state to store and update the list of Posts
    const [roster, setRoster] = useState([]);
    const [page, setPage] = useState(0);
    // ref to indicate if this is the first rendering
    const firstRendering = useRef(true);
    // get the list of [Timeline] Posts from the backend
    
    useEffect(() => {
      // get the list of [Timeline] Posts from the backend
      async function fetchData() {
        const data = await getPosts(page);
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
    });

    return (
      // <PostTable posts={roster} />
      <SearchBar roster={roster} userLoginName3={props.userLoginName2}/>

    );
}


