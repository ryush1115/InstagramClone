// API functions

import axios from 'axios';
// JSON-server URL
// To run the server, enter into command line/terminal: 
// json-server db-grp3-instaphoto.json --port 8000

const rootURL = 'http://localhost:8000'


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
export const getUser = async (userId) => {
  try {
    return await axios.get(`${rootURL}/User/${userId}`);
  } catch (err) {
    console.error(err);
  }
};

export const getTokenUser = async () => {
    try {
        const response = await fetch(`${rootURL}/gettokenuser`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': sessionStorage.getItem('token')
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

// takes id of a post, and gets 
// the postCommentsArray attached to it
export const getCommentsArray = async(PostId) => {
  try {
    const response = await axios.get (`${rootURL}/Post/${PostId}`);
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
    return response.data.data;
  } catch (err) {
    console.error(err)
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


export const createPost = async(post) => {
  console.log(post);
  try {
    return await fetch(`${rootURL}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('token')
        },
        body: JSON.stringify(post)
    });
  } catch (err) {
    console.trace(err);
  }
}

export const getMyFollowings = async () => {
  try {
    const response = await fetch(`${rootURL}/followinglist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token')
      },
    });
    return await response.json();
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    console.error(err);
  }
};

export const following = async (followingName) => {
  console.log(followingName);
  console.log("mockapi called");
  console.log(JSON.stringify(followingName));
  try {
    const response = await fetch(`${rootURL}/followinglist`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': sessionStorage.getItem('token')
        },
        body: JSON.stringify({followingName: followingName})
    });
    return response.data;
  } catch (err) {
    console.trace(err);
  } 
};

export const cancelFollowing = async (followingName) => {
  try {
    const response = await fetch(`${rootURL}/followinglist`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token')
      },
        method: 'PUT',
        body: JSON.stringify({followingName: followingName})
    })
    return response.data;
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
      const myself = await isMyself(users[i]);
      if( !myself && !isAlreadyFollow && await hasCommonFollowings(users[i])){
          suggestionList.push(users[i].username);
      }
    }
    
    return suggestionList;
  } catch (err) {
  }
};


export const isMyFollowing = async (username) => {
  try {

    const myFollowings = await getMyFollowings();
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

export const hasCommonFollowings = async(user) => {
     
  const userFollowList = user.following;
    let commonCount = 0;
    for(let i = 0; i < userFollowList.length; i++){
      let isFollowedByMe = await isMyFollowing(userFollowList[i]);
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

export const isMyself = async (user) => {
  try {
    const response = await fetch(`${rootURL}/isMyself`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token')
      },
        method: 'PUT',
        body: JSON.stringify({user: user})
    })
    console.log("111");
    //return response.data.data;
    return await response.json();
    //return false;
  
  } catch (err) {
    console.error(err);
  } 
};

/*
export const hasCommonFollowings = async (user) => {
  try {
    const response = await axios.get(`${rootURL}/commonfollowings`,`user=${user}`);
    return response.data.data;
    
  } catch (err) {
    console.error(err);
  } 
}
*/

// Create a Comment (without the Id) as input
// and sends a POST request to the /Comment endpoint
// returns the attributes of the Comment with the id

export const createComment = async (CommentObject) => {
  try {
    const response = await axios.post (
      `${rootURL}/comments`,
      `username=${CommentObject.username}&message=${CommentObject.message}
      &tagOfOtherUsers=${CommentObject.postTagOfOtherUsers}&id =${CommentObject.id}`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

// create a comment within the Post schema
export const createCommentInPost = async(PostId, CommentObject) => {
  try {
    // get said post
    const response = await fetch(`${rootURL}/post/${PostId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(CommentObject)
    });
    return response.data.data;

  } catch(err) {
    console.error(err);
  }
}

// update a comment within the Post schema
export const updateComment = async(text, postid, CommentId) => {
  try {
    console.log("sss");
    console.log(`${CommentId}`);
    const response = await axios.put(`${rootURL}/comments/${CommentId}`,`message=${text}&postid=${postid}`);
    return response.data.data;

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
    const response = await axios.get(`${rootURL}/userposts/${username}`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}

export const verifyUser = async (email, password) => {
  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
}

export const createUser = async (username, email, password) => {
  const response = await fetch('http://localhost:8000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  return await response.json();
}


export const isMyLikePost = async(PostId) => {
  console.log("running in mock api")
  try {
    const response = await axios.get(`${rootURL}/isMyLikePost/${PostId}`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}

export const updatePost = async (postID, post) => {
    console.log(postID);
    console.log("updatePost123");
    console.log(post);
    try {
      const response = await fetch(`${rootURL}/post/${postID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('token'),
        },
        body: JSON.stringify(post),
      });
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const checkJWT = async () => {
  const token = sessionStorage.getItem('token');
  console.log("token");
  console.log(token);
    try {
        const response = await fetch(`${rootURL}/checktoken`, {
          method: 'GET',
          headers: {
              'x-auth-token': token,
          },
        });
        return await response.json();
    } catch (err) {
        console.error(err.message);
    }
}

/*
export const getSuggestionList = async () => {
  return await fetch(`${rootURL}/get-suggestion-list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': sessionStorage.getItem('token')
    }
  });
}
*/
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



