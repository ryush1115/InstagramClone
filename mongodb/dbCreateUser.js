// dbCreateUser.js

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

// create a new user
// add a user to the database

const createUser = async (newUser) => {
    //async/await
    try {
        const db = await getDB();
        const result = await db.collection('User').insertOne(newUser);
        console.log(`New User created with id: ${result.insertedId}`);
        return result.insertedId;
    } catch(err) {
        console.log(`error: ${err.message}`)
    }

}


// const createUser = async (newUser) => {
//     //callback version
//     const db = await getDB();
//     const result = await db.collection('User').insertOne(newUser, 
//         (err, result) => {
//             // if there was an error
//             if (err) {
//                 console.log(`error: ${err.message}`);
//                 return;
//             }
//             // print the id of the student
//             console.log(`New User created with id: ${result.insertedId}`);
//     })
// }


// Test part: use main function to test

// main function to execute our code
const main = async () => {
  const conn = await connect();
  createUser( { email: 'JC', username: 'jmscn', password: '123456789', profilePicture:"", follow: [], id:'1234' });
//   followUser(conn, "testUser1");
//   unfollowUser(conn, "testUser1");
//   isMyFollowing(conn, "testUser1");
//   isMyFollowing(conn, "Elmer.Weissnat10");
//   getCommentsArray(conn,'637aaaf308e936a0c97e4a31');
//   getCommentMessage(conn, "637aab0cbbb5ce45b921c599");

//   const testComment = {
//     username: 'testUser',
//     message: 'testContent',
//     tagOfOtherUsers: '',
//     id: '',
//   };

//   createComment(conn, testComment);
//   createCommentInPost(conn, '637aaaf308e936a0c97e4a31', testComment);
};

// execute main
main();
