// import React from 'react'
import FilterablePostTable from "./FilterablePostTable";
import React, { useState,useRef } from "react";

export default function AddPost() {
    // local state new Post
    // we don't need the state variable since we are not passing it as a prop
    // Its child will get the list of Posts from the backend

    const [, setNewPost] = useState(null);

    // Ref variable to tell the FilterablePostTable
    // to load data or not
    const loadData = useRef(false);

    // let newUsername;
    // let newPostComment;
    // let newPostImage = "http://loremflickr.com/640/480"; // default to this image for HW2

    return (
      <div>
        {' '}
        <FilterablePostTable reload={loadData} />
        <div>
        </div>
      </div>
    )

}
