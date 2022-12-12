// const {connect } = require('./dbFollow&Comments');
const { ObjectId, ObjectID } = require('mongodb');
const { MongoClient } = require('mongodb');
const webapp = require('./server');
const { getPost } = require('./dbPost');

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

// how does this go to server.js
// what does this even do lol
const isMyLikePost = async (PostId, UserId) => {
  try {
    console.log('running is my like post');
    /*
      const post = await getPost(PostId);
      const mongo = await connect();
      const db = mongo.db();
      const user1 = await db.collection('User1').findOne({});
      const me = user1;
      console.log(me._id);

      console.log(post[0].like);
      const like = post[0].like || [];
      for(let j = 0; j < like.length; j++){
        if(like[j] === me._id){
          return true;
        }
      }
      return false;
      */
    // const mongo = await connect();
    // const db = mongo.db();
    const db = await getDB();
    console.log('aaaa');
    const count = await db.collection('Post').find({ $and: [{ _id: ObjectId(PostId) }, { like: ObjectId(UserId) }] }).count();
    console.log(count);
    return count > 0;
  } catch (err) {
    console.error(err);
  }
};

const incrementPostLike = async (PostId, UserId) => {
  try {
    console.log('running increment post like');

    /// const mongo = await connect();
    // const db = mongo.db();
    const db = await getDB();
    /*
    const user1 = await db.collection('User1').findOne({});
    const me = user1;
    console.log(me._id);
    */
    const result = await db.collection('Post').updateOne(
      { _id: ObjectId(PostId) },
      {
        $push: {
          like: ObjectId(UserId),
        },
      },
    );

    console.log(`Increment post like: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const cancelPostLike = async (PostId, UserId) => {
  try {
    console.log('running cancel post like');

    // const mongo = await connect();
    // const db = mongo.db();

    /*
    const user1 = await db.collection('User1').findOne({});
    const me = user1;
    console.log(me._id);
    */
    const db = await getDB();
    const result = await db.collection('Post').updateOne(
      { _id: ObjectId(PostId) },
      {
        $pull: { like: ObjectId(UserId) },
      },
    );

    console.log(`delete post like: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  connect,
  isMyLikePost,
  incrementPostLike,
  cancelPostLike,
};
