import React, { useState, Fragment, useEffect, useRef } from "react";
import '../../activityfeed.css';
import '../../userprofile.css';
import PostTable from './PostTable'

  /**
   * Searchbar component
   * pass the username entered as props to its children
   * @param {} props
   */

export default function SearchBar (props) {
    const [username, setUsername] = useState('');
    const handleFilterTextChange = (e) => {
        setUsername(e.target.value);
    }
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




