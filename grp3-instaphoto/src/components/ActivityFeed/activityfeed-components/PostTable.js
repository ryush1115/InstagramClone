import React, {useRef, useState, useEffect} from "react";
import PostRow from './PostRow'
import {getTokenUser} from "../../../api/mock_api";

export default function PostTable (props){
   // counter to provide unique key to rows
   const counter = useRef(0);
   let postsList = [];
   let followingList = [];


   const [user, setUser] = useState({});

   useEffect(() => {
       getTokenUser().then((user) => {
           setUser(user.data);
       });
   }, []);

   // get the list of posts and the username from props

   postsList = props.posts;
   followingList = user.following;

   const makeRows = () => {
   const rows = [];

    postsList.forEach((element) => {
      console.log(element.publicPrivate);
      if ((!element.publicPrivate===true)) {
            return;
      }
      rows.unshift(
        <PostRow post={element} key={counter.current} userid={props.userid} userLoginName5 = {props.userLoginName4}/>
      )

      // increment counter
      
      counter.current += 1;

    });
    return rows;
  };

  const rows = makeRows();
  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
}



