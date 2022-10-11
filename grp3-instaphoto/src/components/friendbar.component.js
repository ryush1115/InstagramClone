import React, { useState, Fragment, useRef, useContext} from "react";
import "../friendbar.css";
import ellipse5011 from "../images/ellipse5011.png";
import ellipse499 from "../images/ellipse499.png";
import ellipse5012 from "../images/ellipse5012.png";
import ellipse501 from "../images/ellipse501.png";
import ellipse497 from "../images/ellipse497.png";
import ellipse500 from "../images/ellipse500.png";
import ellipse498 from "../images/ellipse498.png";
import ellipse5013 from "../images/ellipse5013.png";
import ellipse503 from "../images/ellipse503.png";

const FriendBar = () => {
  return (
    <div className="container">
      <div className="container-1">
        <div className="container-2">
          <div className="image-cropper">
            <img className="image" src={ellipse497} />
          </div>
          
          <div className="container-3">
            <span className="text">graceyyyy...</span>
            <span className="text-1">graceyyyy...</span>
          </div>
        </div>
        <div className="container-4">
          <div className="image-cropper">
            <img className="image-1" src={ellipse498} />
          </div>
          
          <span className="text-2">FavoriteUser</span>
        </div>
        <div className="container-5">
        <div className="image-cropper">
          <img className="image-2" src={ellipse499} />
        </div>
          <span className="text-3">sungerry...</span>
        </div>
        <div className="container-6">

          <div className = "image-cropper">
            <img className="image-3" src={ellipse500} />
          </div>
          <span className="text-4">golden_sq...</span>
        </div>
        <div className="container-7">
          <div className="image-cropper">
            <img className="image-4" src={ellipse501} />
          </div>
        
          <span className="text-5">boookly...</span>
        </div>
        <div className="container-8">
          <div className="image-cropper">
            <img className="image-5" src={ellipse5011} />
          </div>
          
          <span className="text-6">MyCatIs...</span>
        </div>
        <div className="container-9">
        <div className="image-cropper">
          <img className="image-6" src={ellipse5012} />
        </div>
          
          <span className="text-7">myDoggo..</span>
        </div>
        <div className="container-10">
        <div className="image-cropper">
          <img className="image-7" src={ellipse5013} />
          </div>
          <span className="text-8">NeverDull..</span>
        </div>
        <div className="image-cropper-1">
        <img className="image-8" src={ellipse503} />
        </div>
        
      </div>
    </div>
  );

}

export default FriendBar;