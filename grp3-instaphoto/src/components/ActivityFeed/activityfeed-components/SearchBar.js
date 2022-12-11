import React, { useState, Fragment, useEffect, useRef } from "react";
import './activityfeed.css';
import '../../UserProfile/userprofile.css';
import PostTable from './PostTable'

  /**
   * Searchbar component
   * pass the username entered as props to its children
   * @param {} props
   */

export default function SearchBar (props) {
    const [username, setUsername] = useState('');
    //const username = '';

    return (
        <div>
          <PostTable username={username} posts={props.roster} userLoginName4 = {props.userLoginName3}/>
        </div>
      )
}





