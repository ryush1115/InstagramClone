const {connect } = require('./dbFollow&Comments');
const webapp = require('./server');

const getPosts = async () => {
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