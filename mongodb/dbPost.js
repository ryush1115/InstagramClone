const {connect } = require('./dbFollow&Comments');
const webapp = require('./server');

const getPosts = async () => {
  try {
    // get the db
    mongo = await connect();
    const db = mongo.db();
    const result = await db.collection('Post').find({}).toArray();
    // console.log("running get posts");
    console.log(`All posts: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getPost = async () => {
    try {
      // get the db
      mongo = await connect();
      const db = mongo.db();
      const result = await db.collection('Post').find({}).toArray();
      // console.log("running get posts");
      console.log(`All posts: ${JSON.stringify(result.username)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  const getUserPosts = async (username) => {
    try {
      // get the db
      mongo = await connect();
      const db = mongo.db();
      const result  = await db.collection('Post').find({username: username}).toArray();
      console.log(`All User posts: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };
  
  const getUsers = async () => {
    try {
      // get the db
      console.log("running get users");
      mongo = await connect();
      const db = mongo.db();
      const result = await db.collection('User').find({}).toArray();
  
      console.log(`All users: ${JSON.stringify(result)}`);
      return result;
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };
  
  
  const hasCommonFollowings = async (user) => {
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
  };
  
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
    getSuggestionList
  };