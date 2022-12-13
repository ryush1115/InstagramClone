const { MongoClient } = require('mongodb');

// import ObjectID
const { ObjectId } = require('mongodb');

// the mongodb server URL
const dbURL = 'mongodb+srv://Junwei:cis557group3@cluster0.p2tpbsw.mongodb.net/SocialNetwork?retryWrites=true&w=majority';

let MongoConnection;

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

const createPost = async (post) => {
    try {
        const db = await getDB();
        const result = await db.collection('Post').insertOne(post);
        console.log(`Post created: ${JSON.stringify(result.insertedId)}`);
        const resultUser = await db.collection('User').updateOne(
            { username: post.username },
            {
              $push: {
                posts: {
                  $each: [ObjectId(result.insertedId)],
                  $position: 0
                }
              },
            },
          );
        return result;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }
}

const updatePost = async (post, id) => {
    try {
        const db = await getDB();
        const result = await db.collection('Post').updateOne({ _id: ObjectId(id) }, { $set: post });
        console.log(`Post updated: ${JSON.stringify(result)}`);
        return result;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }
}

const deletePost = async (id) => {
    try {
        const db = await getDB();
        const post = await db.collection('Post').findOne({_id: ObjectId(id)});
        const resultUser = await db.collection('User').updateOne(
            { username: post.username },
            {
              $pull: { posts: ObjectId(post._id) },
            },
          );
        console.log("Post deleted from user", JSON.stringify(resultUser));
        const result = await db.collection('Post').deleteOne({ _id: ObjectId(id) });
        console.log(`Post deleted: ${JSON.stringify(result)}`);
        return result;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }
}

const getPost = async (postID) => {
    try {
        const db = await getDB();
        const result = await db.collection('Post').findOne({ _id: ObjectId(postID) });
        console.log(`Post found: ${JSON.stringify(result)}`);
        return result;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost,
}