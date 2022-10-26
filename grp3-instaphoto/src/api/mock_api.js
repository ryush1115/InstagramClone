// API functions

import axios from 'axios';

// mockAPI URL
// const rootURL = 'https://634749ccdb76843976a974a6.mockapi.io/'
//'https://634749ccdb76843976a974a6.mockapi.io/endpoint'
// https://634749ccdb76843976a974a6.mockapi.io/User
// https://634749ccdb76843976a974a6.mockapi.io/Post
// https://634749ccdb76843976a974a6.mockapi.io/Like
// https://634749ccdb76843976a974a6.mockapi.io/Comment

// JSON-server URL
// To run the server, enter into command line/terminal: 
// json-server db-grp3-instaphoto.json --port 8000

const rootURL = 'http://localhost:8000'
//const rootURLUser = 'http://localhost:8000/User'
//const rootURLPost = 'http://localhost:8000/Post'
//const rootURLLike = 'http://localhost:8000/Like'
//const rootURLComment = 'http://localhost:8000/Comment'
//const rootURLTimeLinePost = 'http://localhost:8000/TimelinePost'

// Sends a Get request to the endpoint
// returns all the Users
// export const getUsers = async () => {
//   try{
//     const response = await axios.get(`${rootURL}/User`);
//     return response.data;
//     // data is stored in the data
//     // field of the response
//   } catch (err) {
//     console.error(err);
//   }
// };

// Sends a Get request to the endpoint
// returns all the Users
export const getPosts = async () => {
  try{
    const response = await axios.get(`${rootURL}/Post`);
    return response.data;
    // data is stored in the data 
    // field of the response
  }catch (err) {
    console.error(err);
  }
}


// Takes the id of a Post as input
// and sends a Get request to the /Post: id endpoint
// returns the attributes of the Post
export const getPost = async(PostId) => {
  try{
    const response = await axios.get(`${rootURL}/Post/${PostId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const getUsers = async () => {
  try{
    const response = await axios.get(`${rootURL}/User`);
    return response.data;
    // data is stored in the data 
    // field of the response
  }catch (err) {
    console.error(err);
  }
}


// Takes the id of a User as input
// and sends a Get request to the /User: id endpoint
// returns the attributes of the User
export const getUser = async(userId) => {
  try {
    const response = await axios.get(`${rootURL}/User/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Takes a user email address as input
// and sends a Get request to the /User endpoint
// returns the password of the User with the email address
export const getPassword = async(userEmail) => {
  try {
    const response = await axios.get(`${rootURL}/User/${userEmail}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// Following a user = takes a username as input
// and sends a POST request to the /User endpoint
// 
// export const sendFriendSuggestionList = async(UserObject)=>{
//   try
// }

// // Unfollow a user = take a username as input
// // and delete the user from that user's follow list
// export const 


// Create a Post (without the Id) as input
// and sends a POST request to the /Post endpoint
// returns the attributes of the Post with the id

export const createPost = async (PostObject) => {
  try {
    const response = await axios.post(
      `${rootURL}/Post`,
      `username=${PostObject.username}&postImage=${PostObject.postImage}
      &postComment=${PostObject.postComment}
      &publicPrivate=${PostObject.publicPrivate}
      &postTageOfOtherUsers=${PostObject.postTageOfOtherUsers}`
    );
    console.log(`username=${PostObject.username}&postImage=${PostObject.postImage}
    &publicPrivate=${PostObject.publicPrivate}
    &postTageOfOtherUsers=${PostObject.postTageOfOtherUsers}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// Takes a user (without the Id) as input
// and sends a POST request to the /User endpoint
// returns the attributes of the User with the id
export const createUser = async (UserObject) => {
  try {
    const response = await axios.post(
        `${rootURL}/User`,
        `email=${UserObject.email}&username=${UserObject.username}
        &password=${UserObject.password}&profilePicture=${UserObject.profilePicture}
        &follow=${UserObject.follow}`
    );
    console.log(`email=${UserObject.email}&username=${UserObject.username}
      &password=${UserObject.password}&profilePicture=${UserObject.profilePicture}
      &follow=${UserObject.follow}`);
      return response.data;
      // return the data with the id of the user
  } catch (err) {
    console.error(err);
  }
};

export const getMyFollowings = async () => {
  try {
    const response = await axios.get(`${rootURL}/User1`);
    const me = response.data[0];
    console.log(me.follow);
    return me.follow;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    console.error(err);
  } 
};

export const following = async (followingName) => {
  try {
    const user1 = await axios.get(`${rootURL}/User1`);
    const me = user1.data[0];
    me.follow.push(followingName);
    const response = await axios.put(
      `${rootURL}/User1/0`,
      me
      // update the user1
    );
    return response.data;
    
  } catch (err) {
    console.error(err);
  } 
};

export const cancelFollowing = async (followingName) => {
  try {
    let user1 = await axios.get(`${rootURL}/User1`);
    const me = user1.data[0];
    const myFollowings = me.follow;
    for(let i = 0; i < myFollowings.length; i++){
      if(myFollowings[i] === followingName){
        myFollowings.splice(i,1);
        const response = await axios.put(
          `${rootURL}/User1/0`,
           me
           // update the user1
        );
        return response.data;
      }
    }
    return -1;
    
  } catch (err) {
    console.error(err);
  } 
};

export const isMyFollowing = async (username) => {
  try {
    let user1 = await axios.get(`${rootURL}/User1`);
    const me = user1.data[0];
    const myFollowings = me.follow;
    for(let j = 0; j < myFollowings.length; j++){
        if(myFollowings[j] === username){
          return true;
        }
    }
    return false;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    console.error(err);
  } 
};


export const getSuggestionList= async () => {
  try {
   
    const users = await getUsers();
    const suggestionList = [];
    
    for(let i = 0; i < users.length; i++){
      const isAlreadyFollow = await isMyFollowing(users[i].username);
      if(!isAlreadyFollow && hasCommonFollowings(users[i])){
          suggestionList.push(users[i].username);
      }
    }
    
    return suggestionList;
  } catch (err) {
    console.error(err);
  } 
};

export const hasCommonFollowings = (user) => {
     
  const userFollowList = user.follow;
    let commonCount = 0;
    for(let i = 0; i < userFollowList.length; i++){
      let isFollowedByMe = isMyFollowing(userFollowList[i]);
      if(isFollowedByMe)
          commonCount++;
    }
    if(commonCount >= 3){
        console.log(commonCount);
        return true;
    }
    else{
      return false;
    }
}
// Sends a Get request to the endpoint
// returns all the Timeline Posts
// export const getTimelinePosts = async () => {
//   try {
//     const response = await axios.get(`${rootURL}/TimeLinePost`);
//     return response.data;
//     // data is stored in the data
//     // field of the response
//   } catch (err) {
//     console.error(err);
//   }
// }

// Takes the id of a timeline post as input
// and sends a Get request to the /TimelinePost: id endpoint
// return the attributes of the TimelinePost
// export const getTimeLinePost = async (TimeLinePostId) => {
//   try {
//     const response = await axios.get(`${rootURL}/TimeLinePost/${TimeLinePostId}`);
//     return response.data;
//   } catch (err) {
//     console.error(err);
//   }
// }

