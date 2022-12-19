const {isMyFollowing } = require('./dbFollow&Comments');
const webapp = require('./server');
const { ObjectId} = require('mongodb');
const { MongoClient } = require('mongodb');

// the mongodb server URL
const dbURL = 'mongodb+srv://Junwei:cis557group3@cluster0.p2tpbsw.mongodb.net/SocialNetwork?retryWrites=true&w=majority';

let MongoConnection;
// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ));// we return the entire connection, not just the DB
    // check that we are connected to the db
    console.log(`connected to db: ${MongoConnection.db().databaseName}`);
    return MongoConnection;
  } catch (err) {
    console.log(err.message);
  }
};

/**
 *
 * @returns the database attached to this MongoDB connection
 */
const getDB = async () => {
  // test if there is an active connection
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

const getPosts = async () => {
  try {
    // get the db

    const db = await getDB();
    return await db.collection('Post').find({}).toArray();
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getPost = async (PostId) => {
  // console.log("the post we are looking for is " + PostId);
  try {
    // get the db
    const db = await getDB();
    return await db.collection('Post').find({_id: ObjectId(PostId)}).toArray();
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getUserPosts = async (username) => {
  try {
    // get the db
    const db = await getDB();
    return await db.collection('Post').find({username: username}).toArray();
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getUsers = async () => {
  try {
    // get the db
    console.log('running get users');
    const db = await getDB();
    const result = await db.collection('User').find({}).toArray();

    console.log(`All users: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};


// Make a Post Private (i.e. can only be viewed by Author)
const changePostPrivateOrPublic = async (postId, status) => {
  try {
    const db = await getDB();
    const myBool = (status.toLowerCase() === 'true');
    return await db.collection('Post').updateOne(
      { _id: ObjectId(postId) },
      { $set: { publicPrivate: myBool } },
    );
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
  changePostPrivateOrPublic,
  // hasCommonFollowings
};