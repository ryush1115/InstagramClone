import React, { useState, Fragment, useRef, useContext} from "react";


const FriendBar = () => {
    return (
        <div className="friendbar-container">
          <div className="container-1">
            <div className="container-2">
              <img className="image" src={require('../images/girl1.png')} />
              <div className="container-3">
                <span className="text">graceyyyy...</span>
              </div>
            </div>
          </div>
        </div>
      );

}

export default FriendBar;