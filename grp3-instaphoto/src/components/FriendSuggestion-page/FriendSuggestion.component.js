import React, { useState, Fragment, useEffect } from "react";
import './FriendSuggestion.css';
import Sidebar from "../sidebar.component"
import SingleLineUserInfo from "../FollowingList-page/SubComponents/SingleLineUserInfo"

import { getSuggestionList } from '../../api/mock_api';

const FriendSuggestion = () => {

  const [FriendSuggestionList, setFriendSuggestionList] = useState([]);
  
  let data;
  const someFetch = async () => {
      //using JS fetch API
      data = await getSuggestionList();
      // assuming the state is in the form of an array
      //console.log(data);
      setFriendSuggestionList(data);
  }
  

  useEffect(() => {

      someFetch();
      console.log(FriendSuggestionList);

  },[]);
 
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
}

export default FriendSuggestion;