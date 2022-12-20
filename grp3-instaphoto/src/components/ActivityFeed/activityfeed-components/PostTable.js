import React, {useRef, useState, useEffect} from "react";
import PostRow from './PostRow'

export default function PostTable (props){

   const counter = useRef(0);
   const postsList = props.posts;
   const user = props.user;

   const makeRows = () => {
       const rows = [];
       postsList.forEach((element) => {
           console.log(element.publicPrivate);
           if ((!element.publicPrivate===true)) {
               return;
           }
           rows.push(
               <PostRow user={user} post={element} key={counter.current}/>
           )
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


