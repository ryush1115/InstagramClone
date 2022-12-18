//create a follow button
//return that button
//https://www.youtube.com/watch?v=iRORiaLAgaE
import React, { useState, useEffect} from "react";
import {cancelFollowing, following} from '../../../api/mock_api';
import '../../FriendSuggestion-page/FriendSuggestion.css';

const FriendSuggestionComponent = (props) => {
    const [isfollowed, setisfollowed] = useState(props.isfollowed);

    function handleClick(){
        if(isfollowed){
            setisfollowed(false);
            cancelFollowing(props.name);
            // refresh the page
            //window.location.reload();
        }else{
            setisfollowed(true);
            console.log(props.name);
            following(props.name);
        }
    }

    return (
        <div className="container-1_FriendSuggestion">
            <img className="image-0_FriendSuggestion" src={props.image} />
            <div className="container-2_FriendSuggestion">
                <div className="container-3_FriendSuggestion">
                    <span className="text-1_FriendSuggestion">{props.name}</span>
                    <span className="text-2_FriendSuggestion">{props.description}</span>
                </div>
                <div className="container-4_FriendSuggestion">

                    <span className="text-3_FriendSuggestion" onClick={()=>{
                        handleClick();
                        setisfollowed(!isfollowed)
                    }} >{isfollowed? "Unfollow":"Follow"}</span>

                </div>

            </div>
        </div>)

}
export default FriendSuggestionComponent;

