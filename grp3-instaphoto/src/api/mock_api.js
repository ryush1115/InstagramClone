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
const rootURL = 'http://localhost:8000'
//const rootURLUser = 'http://localhost:8000/User'
//const rootURLPost = 'http://localhost:8000/Post'
//const rootURLLike = 'http://localhost:8000/Like'
//const rootURLComment = 'http://localhost:8000/Comment'
//const rootURLTimeLinePost = 'http://localhost:8000/TimelinePost'

// Sends a Get request to the endpoint
// returns all the Users
export const getUsers = async () => {
  try{
    const response = await axios.get(`${rootURL}/User`);
    return response.data;
    // data is stored in the data
    // field of the response
  } catch (err) {
    console.error(err);
  }
};

// Takes the id of a user as input
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

// To do
// Follow/Unfollow Users


// Create a Post (without the Id) as input
// and sends a POST request to the /Post endpoint
// returns the attributes of the Post with the id

export const createPost = async (PostObject) => {
  try {
    const response = await axios.post(
      `${rootURL}/Post`,
      `username=${PostObject.username}&postImage=${PostObject.postImage}
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
