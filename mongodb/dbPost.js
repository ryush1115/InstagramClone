const {connect, isMyFollowing } = require('./dbFollow&Comments');
const webapp = require('./server');
const { ObjectId} = require('mongodb');

const getPosts = async () => {
  try {
    // get the db
    const mongo = await connect();
    const db = mongo.db();
    return await db.collection('Post').find({}).toArray();
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getPost = async (PostId) => {
    // console.log("the post we are looking for is " + PostId);
    try {
      // get the db
      const mongo = await connect();
      const db = mongo.db();
      return await db.collection('Post').find({_id: ObjectId(PostId)}).toArray();
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  const getUserPosts = async (username) => {
    try {
      // get the db
      const mongo = await connect();
      const db = mongo.db();
      return await db.collection('Post').find({username: username}).toArray();
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };
  
  const getUsers = async () => {
    try {
      // get the db
      console.log("running get users");
      const mongo = await connect();
      const db = mongo.db();
      const result = await db.collection('User').find({}).toArray();
  
      console.log(`All users: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };
  
  
  // const hasCommonFollowings = async(user) => {
  //   console.log("Running has common followings");
  //   console.log("User follow list is " + user.follow);
  //   if(typeof(user.follow) == "undefined") {
  //     return false;
  //   }
  //   const userFollowList = user.follow;
  //   let commonCount = 0;
  //   for(let i = 0; i < userFollowList.length; i++){
  //     let isFollowedByMe = isMyFollowing(userFollowList[i]);
  //     if(isFollowedByMe)
  //         commonCount++;
  //   }
  //   if(commonCount >= 3){
  //       console.log(commonCount);
  //       return true;
  //   }
  //   else{
  //     return false;
  //   }
  // };
  
  const getSuggestionList = async () => {
    try {
      // get the db
      const users = await getUsers();
      // send the response with the appropriate status code
      // console.log(results.username);
      const suggestionList = [];
      
      for(let i = 0; i < users.length; i++){
        const isAlreadyFollow = await isMyFollowing(users[i].username);
        if(!isAlreadyFollow && hasCommonFollowings(users[i])){
            suggestionList.push(users[i].username);
        }
      }
      console.log(`All suggestions: ${JSON.stringify(suggestionList)}`);
      
      return suggestionList;
  
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };
  
  module.exports = {
    connect,
    getPosts,
    getPost,
    getUserPosts,
    getUsers,
    getSuggestionList,
    // hasCommonFollowings
  };