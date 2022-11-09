import React from 'react';
import { useParams } from "react-router-dom";
import "./post-page.css";

export default function Postpage(props) {

    //TODO: Check if user signed in or not, and if user is signed in check if this post belongs to user or not

    const { id } = useParams();

    return (
        <div className={"post-page-wrapper"}>
            {id}
        </div>
    );
}
