// API functions

import axios from 'axios';
// JSON-server URL
// To run the server, enter into command line/terminal: 
// json-server db-grp3-instaphoto.json --port 8000

const rootURL = 'http://localhost:8080'


// Sends a Get request to the endpoint
// returns all the Posts
export const getPosts = async () => {
  try{
    const response = await axios.get(`${rootURL}/Post`);
    return response.data.data;
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
  try {
    const response = await axios.get(`${rootURL}/post/${PostId}`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}

export const getUsers = async () => {
  try{
    const response = await axios.get(`${rootURL}/users`);
    return response.data.data;
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
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

// takes id of a post, and gets 
// the postCommentsArray attached to it
export const getCommentsArray = async(PostId) => {
  try {
    const response = await axios.get (`${rootURL}/activity-feed/${PostId}/comment`);
    return response.data.data;

  } catch (err) {
    console.error(err);
  }
}

// Takes id of a post, and 
// returns the message of the comment
export const getCommentMessage = async(CommentId) => {
  try {
    const response = await axios.get(`${rootURL}/comments/${CommentId}`);
    return response.data.data.message;
  } catch (err) {
    console.error(err)
  }
}

// Takes a user email address as input
// and sends a Get request to the /User endpoint
// returns the password of the User with the email address
export const getPassword = async(userEmail) => {
  try {
    const response = await axios.get(`${rootURL}/User/${userEmail}`);
    return response.data.data;
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
      &postCaption=${PostObject.postCaption}
      &publicPrivate=${PostObject.publicPrivate}
      &postTagOfOtherUsers=${PostObject.postTagOfOtherUsers}
      &postCommentArray=${PostObject.postCommentArray}
      &like=${PostObject.like}`
    );
    console.log(`username=${PostObject.username}&postImage=${PostObject.postImage}
    &postCaption=${PostObject.postCaption}
    &publicPrivate=${PostObject.publicPrivate}
    &postTagOfOtherUsers=${PostObject.postTagOfOtherUsers}
    &postCommentArray=${PostObject.postCommentArray}
    &like=${[]}`);
    return response.data.data;
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
        `${rootURL}/user`,
        `email=${UserObject.email}&username=${UserObject.username}
        &password=${UserObject.password}&profilePicture=${UserObject.profilePicture}
        &follow=${UserObject.follow}&id=${UserObject.id}`
    );
    console.log(`email=${UserObject.email}&username=${UserObject.username}
      &password=${UserObject.password}&profilePicture=${UserObject.profilePicture}
      &follow=${UserObject.follow}&id=${UserObject.id}`);
      return response.data.data;
      // return the data with the id of the user
  } catch (err) {
    console.error(err);
  }
};

export const getMyFollowings = async () => {
  try {
    const response = await axios.get(`${rootURL}/followinglist`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const following = async (followingName) => {
  try {
    const user1 = await axios.get(`${rootURL}/User1`);
    const me = user1.data.data[0];
    me.follow.push(followingName);
    const response = await axios.put(
      `${rootURL}/User1/${me.id}`,
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
    const me = user1.data.data[0];
    const myFollowings = me.follow;
    for(let i = 0; i < myFollowings.length; i++){
      if(myFollowings[i] === followingName){
        myFollowings.splice(i,1);
        const response = await axios.put(
          `${rootURL}/User1/${me.id}`,
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
    const me = user1.data.data[0];
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
    const response = await axios.get(`${rootURL}/friendsuggestion`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const hasCommonFollowings = async(user) => {
  try {
    const response = await axios.get(`${rootURL}/commonfollowings`,`user=${user}`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}
// Create a Comment (without the Id) as input
// and sends a POST request to the /Comment endpoint
// returns the attributes of the Comment with the id

export const createComment = async (CommentObject) => {
  try {
    const response = await axios.post (
      `${rootURL}/Comment`,
      `username=${CommentObject.username}&message=${CommentObject.message}
      &tagOfOtherUsers=${CommentObject.postTagOfOtherUsers}`
    )
  } catch (err) {
    console.error(err);
  }
};

// create a comment within the Post schema
export const createCommentInPost = async(PostId, CommentObject) => {
  try {
    // get said post
    const post = await getPost(PostId);
    post.postCommentArray.push(CommentObject);

    const response = await axios.put(`${rootURL}/Post/${PostId}`, post);
    return response.data.data;

  } catch(err) {
    console.error(err);
  }
}

// update a comment within the Post schema
export const updateComment = async(text, CommentId) => {
  try {
    const PostIdTemp = "CREL3Vi";
    // get said post
    const post = await getPost(PostIdTemp);

    // loop through the post comment array
    for (let i = 0; i<post.postCommentArray.length; i++) {
      if(post.postCommentArray[i].id === CommentId) {
        // update the message
        post.postCommentArray[i].message = text

        // axios put call
        const response = await axios.put(`${rootURL}/Post/${PostIdTemp}`,post);
        return response.data.data
      }
    }

  } catch(err) {
    console.error(err);
  }
}

// Delete a Post
export const deletePost = async(PostId) => {
  try {
    const response = await axios.delete(`${rootURL}/Post/${PostId}`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}

// THIS IS NOT WORKING
// Increment a Like
export const incrementPostLike = async(PostId) => {
 console.log("running increment post like");
 console.log("POSTID IS " + PostId);
  
  try {
    const response = await axios.put(`${rootURL}/postlike`, PostId);
    return response.data.data;
  } catch (err) {
    console.log("hitting error");
    console.error(err);
  }
}

// THIS IS NOT WORKING
// Cancel a Like
export const cancelPostLike = async(PostId) => {
  console.log("running cancel post like");
   try {
     const response = await axios.delete(`${rootURL}/postlike`,PostId);
     return response.data.data;
   } catch (err) {
     console.error(err);
   }
 }

export const getUserPosts = async (username) => {
  console.log(username);
  try {
    const response = await axios.get(`${rootURL}/Post`);
    const posts = response.data.data;
    console.log(posts);
    const userPosts = [];
    for (let i = 0; i < posts.length; i++){
      if (posts[i].username === username){
        userPosts.push(posts[i]);
      }
    }
    console.log("mock userposts");
    console.log(userPosts);
    return userPosts;
  } catch (err) {
    console.error(err);
  }
}


export const isMyLikePost = async(PostId) => {
  try {
    const post = await getPost(PostId);

    const user1 = await axios.get(`${rootURL}/User1`);
    const me = user1.data.data[0];

    for(let j = 0; j < post.like.length; j++){
      if(post.like[j] === me.id){
        return true;
      }
    }
    return false;

  } catch (err) {
    console.error(err)
  }
}

export const updatePost = async (postID, post) => {
    console.log(postID);
    console.log("updatePost123");
    console.log(post);
    try {
        const response = await axios.put(`${rootURL}/Post/${postID}`, post);
        return response.data.data;
    } catch (err) {
        console.error(err);
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



