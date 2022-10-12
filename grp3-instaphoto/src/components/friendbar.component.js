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
    <div className="container_friendbar">
      <div className="container-1_friendbar">
        <div className="container-2_friendbar">
          <div className="image-cropper">
            <img className="image" src={ellipse497} />
          </div>
          
          <div className="container-3_friendbar">
            <span className="text_friendbar">graceyyyy...</span>
            <span className="text-1_friendbar">graceyyyy...</span>
          </div>
        </div>
        <div className="container-4_friendbar">
          <div className="image-cropper">
            <img className="image-1_friendbar" src={ellipse498} />
          </div>
          
          <span className="text-2_friendbar">FavoriteUser</span>
        </div>
        <div className="container-5_friendbar">
        <div className="image-cropper">
          <img className="image-2_friendbar" src={ellipse499} />
        </div>
          <span className="text-3_friendbar">sungerry...</span>
        </div>
        <div className="container-6_friendbar">

          <div className = "image-cropper">
            <img className="image-3_friendbar" src={ellipse500} />
          </div>
          <span className="text-4_friendbar">golden_sq...</span>
        </div>
        <div className="container-7_friendbar">
          <div className="image-cropper">
            <img className="image-4_friendbar" src={ellipse501} />
          </div>
        
          <span className="text-5_friendbar">boookly...</span>
        </div>
        <div className="container-8_friendbar">
          <div className="image-cropper">
            <img className="image-5_friendbar" src={ellipse5011} />
          </div>
          
          <span className="text-6_friendbar">MyCatIs...</span>
        </div>
        <div className="container-9_friendbar">
        <div className="image-cropper">
          <img className="image-6_friendbar" src={ellipse5012} />
        </div>
          
          <span className="text-7_friendbar">myDoggo..</span>
        </div>
        <div className="container-10_friendbar">
        <div className="image-cropper">
          <img className="image-7_friendbar" src={ellipse5013} />
          </div>
          <span className="text-8_friendbar">NeverDull..</span>
        </div>
        <div className="image-cropper-1">
        <img className="image-8_friendbar" src={ellipse503} />
        </div>
        
      </div>
    </div>
  );

}

export default FriendBar;