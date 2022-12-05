const {connect } = require('./dbFollow&Comments');
const webapp = require('./server');
const { ObjectId, ObjectID } = require('mongodb');
const {getPost } = require('./dbPost');
  
  // how does this go to server.js
  // what does this even do lol
  const isMyLikePost = async (PostId) => {
    try {
      console.log("running is my like post");
      
      const post = await getPost(PostId);
      mongo = await connect();
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
  
    } catch (err) {
      console.error(err)
    }
  };
  
  const incrementPostLike = async(PostId) => {
    try {
      console.log("running increment post like");
      
      mongo = await connect();
      const db = mongo.db();
      const user1 = await db.collection('User1').findOne({});
      const me = user1;
      console.log(me._id);
  
      const result = await db.collection('Post').updateOne(
        { _id: ObjectId(PostId) },
        {
          $push: {
            like: {
              $each: [me._id],
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
  
  const cancelPostLike = async(PostId) => {
    try {
      console.log("running cancel post like");
      
      mongo = await connect();
      const db = mongo.db();
      const user1 = await db.collection('User1').findOne({});
      const me = user1;
      console.log(me._id);
  
      const result = await db.collection('Post').updateOne(
        { _id: ObjectId(PostId) },
        {
          $pull: {like: me._id},
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