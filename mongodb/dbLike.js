const {connect } = require('./dbFollow&Comments');
const webapp = require('./server');
const { ObjectId, ObjectID } = require('mongodb');
const {getPost } = require('./dbPost');
  
  // how does this go to server.js
  // what does this even do lol
  const isMyLikePost = async (PostId, UserId) => {
    try {
      // console.log("running is my like post in dbLike.js and printing PostId", PostId);
      
      const post = await getPost(PostId);
      mongo = await connect();
      const db = mongo.db();


      // console.log(post[0].like);
      const like = post[0].like || [];
      for(let j = 0; j < like.length; j++){
        console.log("like is this", like[j], "userid is that", ObjectId(UserId));
        if(like[j].equals(ObjectId(UserId))){
          console.log("returning true");
          return true;
        }
      }
      return false;
  
    } catch (err) {
      console.error(err)
    }
  };
  
  const incrementPostLike = async(PostId, UserId) => {
    try {
      // console.log("running increment post like in dblike.js");
      // console.log("Post Id is", PostId, UserId);
      
      mongo = await connect();
      const db = mongo.db();
      // const user1 = await db.collection('User1').findOne({});
      // const me = user1;
      // console.log(me._id);
  
      const result = await db.collection('Post').updateOne(
        { _id: ObjectId(PostId) },
        {
          $push: {
            like: {
              $each: [ObjectId(UserId)],
              $position: 0,
            },
          },
        },
      );
      
      console.log(`Increment post like: ${JSON.stringify(result)}`);
      return result;
  
    } catch (err) {
      console.error(err)
    }
  }
  
  const cancelPostLike = async(PostId, UserId) => {
    try {
      // console.log("running cancel post like");
      
      mongo = await connect();
      const db = mongo.db();

  
      const result = await db.collection('Post').updateOne(
        { _id: ObjectId(PostId) },
        {
          $pull: {like: ObjectId(UserId)},
          }
      );
      
      console.log(`delete post like: ${JSON.stringify(result)}`);
      return result;
  
    } catch (err) {
      console.error(err)
    }
  };

  module.exports = {
    connect,
    isMyLikePost,
    incrementPostLike,
    cancelPostLike
  };