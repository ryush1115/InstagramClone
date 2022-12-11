import React, {useRef } from "react";
import PostRow from './PostRow'

export default function PostTable (props){
   // counter to provide unique key to rows
   const counter = useRef(0);
   let postsList = [];

   // get the list of posts and the username from props

   postsList = props.posts;

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

      console.log("element.publicPrivate");
      console.log(element.publicPrivate);
      if(!element.publicPrivate===true) {
            return;
      }

      rows.unshift(
        <PostRow post={element} key={counter.current} />
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



