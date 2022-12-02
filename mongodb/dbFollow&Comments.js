// this is a node app, we must use commonJS modules/ require

// import the mongodb driver
const { MongoClient } = require('mongodb');

// import ObjectID
const { ObjectId } = require('mongodb');

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

/**
 *
 * Close the mongodb connection
 */
const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

const getMyFollowing = async () => {
  try {
    // get the db
    const db = await getDB();
    const me = await db.collection('User1').findOne({});
    const result = me.follow;
    console.log(`My following: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const followUser = async (followingName) => {
  try {
    // get the db
    const db = await getDB();
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

const unfollowUser = async (followingName) => {
  try {
    // get the db
    const db = await getDB();
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

const isMyFollowing = async (followingName) => {
  try {
    // get the db
    const db = await getDB();
    const count = await db.collection('User1').find({ follow: followingName }).count();
    const ans = (count > 0);
    console.log(`Is this user my followng: ${ans}`);
    return ans;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getCommentsArray = async (PostId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Post').findOne({ _id: ObjectId(PostId) });
    console.log(`CommentArray: ${JSON.stringify(result.postCommentArray)}`);
    return result.postCommentArray;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getCommentMessage = async (CommentId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Comment').findOne({ _id: ObjectId(CommentId) });
    console.log(`CommentMessage: ${JSON.stringify(result.message)}`);
    return result.message;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const createComment = async (CommentObject) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Comment').insertOne(CommentObject);
    console.log(`New comment created with id: ${JSON.stringify(result.insertedId)}`);
    return result.insertedId;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const createCommentInPost = async (PostId, CommentObject) => {
  try {
    // get the db
    const db = await getDB();

    const newComment = await db.collection('Comment').insertOne(CommentObject);
    CommentObject._id = newComment.insertedId;

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

const updateComment = async (text, postId, commentId) => {
  try {
    // get the db
    const db = await getDB();
    console.log('aaaa');
    console.log(`${postId}`);
    console.log(`${commentId}`);
    const result = await db.collection('Post').updateOne(
      { _id: ObjectId(postId) },
      { $set: { 'postCommentArray.$[filter].message': text } },
      { arrayFilters: [{ 'filter._id': ObjectId(commentId) } ] }
    );
    console.log('bbb');
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
  closeMongoDBConnection,
  getDB,
  connect,
  getMyFollowing,
  unfollowUser,
  followUser,
  isMyFollowing,
  getCommentsArray,
  getCommentMessage,
  createComment,
  createCommentInPost,
  updateComment,
};
