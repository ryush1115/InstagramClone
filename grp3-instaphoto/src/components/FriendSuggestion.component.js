import React, {useState, Fragment, useRef, useContext} from "react";
import { Navbar, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactDOM from "react-dom";
import '../FriendSuggestion.css';
import ellipse507 from "../images/ellipse507.png";
import ellipse504 from "../images/ellipse504.png";
import ellipse505 from "../images/ellipse505.png";
import ellipse508 from "../images/ellipse508.png";
import ellipse5041 from "../images/ellipse5041.png";
import ellipse506 from "../images/ellipse506.png";

const FriendSuggestion =()=>{  
  const [buttonText, setButtonText] =  useState('Follow');
  const [Following, setFollowing] =  useState(false);

  const FollowHandler =()=>{
    setButtonText(Following? "Follow" : "Following");
    setFollowing(!Following);
  }

  // const btn1 = Document.getElementById("btn");

  // btn1.addEventListener('click', handleClick);
  
  // function handleClick(){
  // const initialText = "Follow";
  
  // if (btn1.textContent.toLowerCase().includes(initialText.toLowerCase())){
  // btn1.textContent = "Following";
  // }else{
  // btn1.textContent = initialText;
  // }
  // };   


  // function handleClick(text){
  // console.log(text);
  //   if(text==="Follow"){
  //     setButtonText("Following")}
  //     else if(text==="Following"){
  //       setButtonText("Follow");}
  //     }
  
    return (
        <Fragment>
        <Navbar className='home'>
            
            <Card className='card'>
            <div className = 'logo'>
                <h>Instaphoto&nbsp;</h>
                <img src={require('../images/logo.PNG')} alt="logo" />
            </div>
            <br></br>
            <div>
              <Card.Img
                src={require('../images/grp3.PNG')}
                variant='top'
                className='sig'
              />
            <p className = 'username'> grp3foreva</p>
            </div>
            <div>
              <Card.Body>
                <Card.Text>
                  <div className='space'></div>
                  <ListGroup variant='flush'>
                    <ListGroupItem className='list'>
                      {/* <span className='link' onClick={() => goToAnchor('section1')}> */}
                      <span>
                        Home
                      </span>
                    </ListGroupItem>
                    <ListGroupItem className='list'>
                      {/* <span className='link' onClick={() => goToAnchor('section2')}> */}
                      <span>
                        Create
                      </span>
                    </ListGroupItem>
                    <ListGroupItem className='list'>
                      {/* <span className='link' onClick={() => goToAnchor('section3')}> */}
                      <span>
                        Profile
                      </span>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
              </div>
              <br></br>
              <div className = 'suggestions'>
                <p className="suggestion-text">Suggestions for you</p>
                <button className="show-all-btn">See all</button>
                <div className="profile-card">
                    <div>
                        <img className = 'other-user' src={require('../images/grp3.PNG')} alt=""/>
                    </div>
                    <button className="action-btn" type="button">
                        <span className="username">akikozzm</span>
                        <span className="follow">Follow</span>
                    </button>
                </div>
                <div className="profile-card">
                    <div>
                        <img className = 'other-user' src={require('../images/grp3.PNG')} alt=""/>
                    </div>
                    <button className="action-btn" type="button">
                        <span className="username">akikozzm</span>
                        <span className="follow">Follow</span>
                    </button>
                </div>
                <div className="profile-card">
                    <div>
                        <img className = 'other-user' src={require('../images/grp3.PNG')} alt=""/>
                    </div>
                    <button className="action-btn" type="button">
                        <span className="username">akikozzm</span>
                        <span className="follow">Follow</span>
                    </button>
                </div>
              </div>
            </Card>
          </Navbar> 

        <div>

        </div>

  

<div className="container-0_FriendSuggestion">
      <span className="text-0_FriendSuggestion">Suggested</span>
      <div className="container-1_FriendSuggestion">
        <img className="image-0_FriendSuggestion" src={ellipse504} />
        <div className="container-2_FriendSuggestion">
          <div className="container-3_FriendSuggestion">
            <span className="text-1_FriendSuggestion">akikozzm</span>
            <span className="text-2_FriendSuggestion">Cool Person</span>
          </div>
          <div className="container-4_FriendSuggestion">
            
            <span className="text-3_FriendSuggestion" onClick={FollowHandler} >{buttonText}</span>
//place the follow button inside this span
          </div>
          {/* <script>
            const newNode = document.createElement("button");
            const parentDiv = document.getElementById("btn").parentNode;

          </script> */}
        </div>
      </div>
      <div className="container-5_FriendSuggestion">
        <img className="image-1_FriendSuggestion" src={ellipse505} />
        <div className="container-6_FriendSuggestion">
          <div className="container-7_FriendSuggestion">
            <span className="text-4_FriendSuggestion">someoneelse</span>
            <span className="text-5_FriendSuggestion">ZZ Akiko</span>
          </div>
          <div className="container-8_FriendSuggestion">
            <span className="text-6_FriendSuggestion" >Follow</span>
          </div>
        </div>
      </div>
      <div className="container-9_FriendSuggestion">
        <img className="image-2_FriendSuggestion" src={ellipse506} />
        <div className="container-10_FriendSuggestion">
          <div className="container-11_FriendSuggestion">
            <span className="text-7_FriendSuggestion">Mannnnnnnn1</span>
            <span className="text-8_FriendSuggestion">Sporty Guy</span>
          </div>
          <div className="container-12_FriendSuggestion">
            <span className="text-9_FriendSuggestion">Follow</span>
          </div>
        </div>
      </div>
      <div className="container-13_FriendSuggestion">
        <img className="image-3_FriendSuggestion" src={ellipse507} />
        <div className="container-14_FriendSuggestion">
          <div className="container-15_FriendSuggestion">
            <span className="text-10_FriendSuggestion">highighighhuang</span>
            <span className="text-11_FriendSuggestion">Not so low</span>
          </div>
          <div className="container-16_FriendSuggestion">
            <span className="text-12_FriendSuggestion">Follow</span>
          </div>
        </div>
      </div>
      <div className="container-17_FriendSuggestion">
        <img className="image-4_FriendSuggestion" src={ellipse508} />
        <div className="container-18_FriendSuggestion">
          <div className="container-19_FriendSuggestion">
            <span className="text-13_FriendSuggestion">anytimeisnaptime</span>
            <span className="text-14_FriendSuggestion">Celebrity Cat 123</span>
          </div>
          <div className="container-20_FriendSuggestion">
            <span className="text-15_FriendSuggestion">Follow</span>
          </div>
        </div>
      </div>
      <div className="container-21_FriendSuggestion">
        <img className="image-5_FriendSuggestion" src={ellipse5041} />
        <div className="container-22_FriendSuggestion">
          <div className="container-23_FriendSuggestion">
            <span className="text-16_FriendSuggestion">TigerMom123</span>
            <span className="text-17_FriendSuggestion">Lin</span>
          </div>
          <div className="container-24_FriendSuggestion">
            <span className="text-18_FriendSuggestion">Follow</span>
          </div>
        </div>
      </div>
    </div>

        </Fragment>
      );
}

export default FriendSuggestion;