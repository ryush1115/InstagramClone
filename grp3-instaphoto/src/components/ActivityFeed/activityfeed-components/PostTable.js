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

      //const {post} = element;

      // if (usernameFilter === 'SHOW_ALL') {
      //   rows.unshift(
      //     <PostRow post={element} key={counter.current} />
      //   );
      // } else {
      //   if (!element.username.startsWith(usernameFilter)) {
      //     return;
      //   }
      //   rows.unshift(
      //     <PostRow post={element} key={counter.current}/>,
      //   );
      // }

      // if (usernameFilter === 'SHOW_ALL') {

      // } else {
      //   if(!element.publicPrivate==='true') {
      //     return;
      //   }
      // }

      // console.log("PostTable: element.publicPrivate");
      // console.log("Printing inside PostTable", props.username);
      console.log(element.publicPrivate);
      //if ((!element.publicPrivate===true) {
        // followingList.forEach(x) {
          // if !(x == element.username)
        //}
      if ((!element.publicPrivate===true)) {

            return;
      }
      // loop thru loginUserName's following, then check if
      // element.username (the post's author) is loginUserName's following


      rows.unshift(
        // <PostRow post={element} key={counter.current} userLoginName5 = {props.userLoginName4}/>
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



