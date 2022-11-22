// this is a node app, we must use commonJS modules/ require

// import the mongodb driver
const { MongoClient } = require('mongodb');

// import ObjectID
const { ObjectId } = require('mongodb');

// the mongodb server URL
const dbURL = 'mongodb+srv://Junwei:cis557group3@cluster0.p2tpbsw.mongodb.net/SocialNetwork?retryWrites=true&w=majority';

// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    const con = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    // check that we are connected to the db
    console.log(`connected to db: ${con.databaseName}`);
    return con;
  } catch (err) {
    console.log(err.message);
  }
};

const getMyFollowing = async (db) => {
  try {
    const me = await db.collection('User1').findOne({});
    const result = me.follow;
    console.log(`My following: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const followUser = async (db, followingName) => {
  try {
    const result = await db.collection('User1').updateOne(
      {},
      {
        $push: {
          follow: {
            $each: [followingName],
            $position: 0,
          },
        },
      },
    );
    console.log(`User1: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const unfollowUser = async (db, followingName) => {
  try {
    const result = await db.collection('User1').updateOne(
      {},
      { $pull: { follow: followingName } },
    );
    console.log(`User1: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const isMyFollowing = async (db, followingName) => {
  try {
    const count = await db.collection('User1').find({ follow: followingName }).count();
    const ans = (count > 0);
    console.log(`Is this user my followng: ${ans}`);
    return ans;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getCommentsArray = async (db, PostId) => {
  try {
    const result = await db.collection('Post').findOne({ _id: ObjectId(PostId) });
    console.log(`CommentArray: ${JSON.stringify(result.postCommentArray)}`);
    return result.postCommentArray;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getCommentMessage = async (db, CommentId) => {
  try {
    const result = await db.collection('Comment').findOne({ _id: ObjectId(CommentId) });
    console.log(`CommentMessage: ${JSON.stringify(result.message)}`);
    return result.message;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const createComment = async (db, CommentObject) => {
  try {
    const result = await db.collection('Comment').insertOne(CommentObject);
    console.log(`New comment created with id: ${JSON.stringify(result.insertedId)}`);
    return result.insertedId;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const createCommentInPost = async (db, PostId, CommentObject) => {
  try {
    const result = await db.collection('Post').updateOne(
      { _id: ObjectId(PostId) },
      {
        $push: {
          postCommentArray: {
            $each: [CommentObject],
            $position: 0,
          },
        },
      },
    );
    console.log(`updatedPost: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// Test part: use main function to test
/*
// main function to execute our code
const main = async () => {
  const conn = await connect();
  // followUser(conn, "testUser1");
  // unfollowUser(conn, "testUser1");
  // isMyFollowing(conn, "testUser1");
  // isMyFollowing(conn, "Elmer.Weissnat10");
  // getCommentsArray(conn,'637aaaf308e936a0c97e4a31');
  // getCommentMessage(conn, "637aab0cbbb5ce45b921c599");

//   const testComment = {
//     username: 'testUser',
//     message: 'testContent',
//     tagOfOtherUsers: '',
//     id: '',
//   };

  // createComment(conn, testComment);
  // createCommentInPost(conn, '637aaaf308e936a0c97e4a31', testComment);
};

// execute main
main();
*/
// export the functions
// export the functions
module.exports = {
  connect,
  getMyFollowing,
  unfollowUser,
  followUser,
  isMyFollowing,
  getCommentsArray,
  getCommentMessage,
  createComment,
  createCommentInPost,
};
