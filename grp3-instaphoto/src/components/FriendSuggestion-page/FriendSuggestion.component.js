import React, { useState, Fragment, useEffect } from "react";
import './FriendSuggestion.css';
import Sidebar from "../sidebar.component"
import SingleLineUserInfo from "../FollowingList-page/SubComponents/SingleLineUserInfo"

import {getSuggestionList, getTokenUser, getUsers} from '../../api/mock_api';

const FriendSuggestion = () => {

  const [FriendSuggestionList, setFriendSuggestionList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({});
  
  let data;
  let users;
  let user_data;
  const someFetch = async () => {
      //using JS fetch API
      data = await getSuggestionList();
      users = await getUsers();
      user_data = await getTokenUser();
      // assuming the state is in the form of an array
      console.log(user_data.data);
      setFriendSuggestionList(data);
      setUserList(users);
      setUser(user_data.data);
  }
  

  useEffect(() => {

      someFetch();
      console.log(FriendSuggestionList);
      console.log(userList);

  },[]);

  if (sessionStorage.getItem("token")) {
      try {
          return (
              <Fragment>
                  <Sidebar/>

                  <div className="container-0_FriendSuggestion">
                      <span className="text-0_FriendSuggestion">Suggested</span>
                      {FriendSuggestionList.map(v => {
                          return <SingleLineUserInfo name={v} description={"This is a cool person"} image={null} isfollowed={false} />
                      })}
                  </div>

              </Fragment>
          );
      } catch (e) {
          return (
              <Fragment>
                  <Sidebar />
                  <div className="container-0_FriendSuggestion">
                      <span className="text-0_FriendSuggestion">Suggested</span>
                      {
                          userList.map(v => {
                              if (v.username !== user.username && !user.following.includes(v.username)) {
                                  return <SingleLineUserInfo name={v.username} description={"This is a cool person"} image={null} isfollowed={false} />
                              }
                          })
                      }
                  </div>
              </Fragment>
          );
      }
  } else {
        console.log("not signed in");
        window.location.href = "/sign-in";
  }
}

export default FriendSuggestion;