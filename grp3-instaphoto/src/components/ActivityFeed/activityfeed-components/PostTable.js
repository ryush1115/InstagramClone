import React, { useState, Fragment, useEffect, useRef } from "react";
import PostRow from './PostRow'

export default function PostTable (props){
   // counter to provide unique key to rows
   const counter = useRef(0);
   let postsList = [];
   let usernameFilter = 'SHOW_ALL';
   // get the list of posts and the username from props

   if (props.username) {
     usernameFilter = props.username;
   }
   postsList = props.posts;

   const makeRows = () => {
    const rows = [];

    postsList.forEach((element) => {
      // const {post} = element;
      if (usernameFilter === 'SHOW_ALL') {
        rows.unshift(
          <PostRow post={element} key={counter.current} />
        );
      } else {
        if (!element.username.startsWith(usernameFilter)) {
          return;
        }
        rows.unshift(
          <PostRow post={element} key={counter.current}/>,
        );
      }
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




//   render() {
//     return (
//       <div>PostTable</div>
//     )
//   }
//}

/**
 
  function PostTable(props) {
    // counter to provide unique key to rows
    const counter = useRef(0);
    let postsList = [];
    let usernameFilter = 'SHOW_ALL';
    // get the list of posts and the username from props

    if (props.username) {
      usernameFilter = props.username;
    }
    postsList = props.posts;

    const makeRows = () => {
      const rows = [];

      postsList.forEach((element) => {
        // const {post} = element;
        if (usernameFilter === 'SHOW_ALL') {
          rows.unshift(
            <PostRow post={element}
              key={counter.current}
            />
          );
        } else {
          if (!element.username.startsWith(usernameFilter)) {
            return;
          }
          rows.unshift(
            <PostRow post={element}
              key={counter.current}
            />,
          );
        }
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


 * 
 */