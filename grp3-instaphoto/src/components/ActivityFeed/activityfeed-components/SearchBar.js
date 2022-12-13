import React, { useState, useEffect} from "react";
import './activityfeed.css';
import '../../UserProfile/userprofile.css';
import PostTable from './PostTable'
import {getTokenUser} from '../../../api/mock_api';

  /**
   * Searchbar component
   * pass the username entered as props to its children
   * @param {} props
   */

export default function SearchBar (props) {
    // const [username, setUsername] = useState('');
    //const username = '';
    const [user, setUser] = useState({});
    //getTokenUser().then((user) => {
     //setUser(user.data);
     //});
    // console.log("Printing in search bar", user._id);
    useEffect(() => {
        getTokenUser().then((user) => {
            setUser(user.data);
        });
    }, []);
    return (
        <div>
          {/* <PostTable username={username} posts={props.roster} userLoginName4 = {props.userLoginName3}/> */}
          <PostTable username={user.username} posts={props.roster} userid ={user._id} userLoginName4 = {props.userLoginName3}/>
        </div>
      )
}





