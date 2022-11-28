// dbUser.js

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
 * Close the mongodb connection
 */
 const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

// create a new user
// add a user to the database

const createUser = async (newUser) => {
  // async/await
  try {
    const db = await getDB();
    const result = await db.collection('User').insertOne(newUser);
    console.log(`New User created with id: ${result.insertedId}`);
    return result.insertedId;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// get all users
const getAllUsers = async () => {
  try {
    const db = await getDB();
    const result = await db.collection('User').find({}).toArray(); // no filtering
    // print the results
    console.log(`Users: ${JSON.stringify(result)}`);
  } catch (err) {
    console.log(`error: ${err.message}`);
}
};

// read a user given their ID
const getUser = async (userID) => {
  try {
    const db = await getDB();
    const result = await db.collection('User').findOne({ _id: ObjectId(userID)});
    // print result
    console.log(`Student: ${JSON.stringify(result)}`);
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// Update user records
const updateUser = async (userID, newPassword) => {
  try {
    const db = await getDB();
    const result = await db.collection('User').updateOne(
      { _id: ObjectId(userID) },
      { $set: { password: newPassword } },
    );
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// const deleteUser = async (userID) => {
//   try {
//     const db = await getDB();
//     const result = await db.collection('user').deleteOne(
//       { _id: ObjectId(userID) },
//     );
//     console.log(`Deleted User: ${JSON.stringify(result)}`);
//   } catch (err) {
//     console.log(`error: ${err.message} `);
//   }
// }

// Test part: use main function to test

// main function to execute our code

/** 
const main = async () => {
  const conn = await connect();
  //await createUser( { email: 'rachel', username: 'rachel', password: '1234567777', profilePicture:"", follow: [], id:'1235' });
  //await getAllUsers();
  await getUser('637fc5f683768e86f5852c1c');
  await updateUser('637fc5f683768e86f5852c1c', '123456789NewPW');
  await getUser('637fc5f683768e86f5852c1c');
  //await deleteUser('637aaadf3f3f430d2ce0ac9f');
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

*/

module.exports = {
  //closeMongoDBConnection, connect, getDB, createUser, getAllUsers, getUser, updateUser, deleteUser,
  closeMongoDBConnection, connect, getDB, createUser, getAllUsers, getUser, updateUser, 

};