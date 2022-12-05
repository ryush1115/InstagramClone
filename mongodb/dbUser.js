// dbUser.js

// import the mongodb driver
const { MongoClient } = require('mongodb');

// import ObjectID
const { ObjectId } = require('mongodb');

// the mongodb server URL
const dbURL = 'mongodb+srv://Junwei:cis557group3@cluster0.p2tpbsw.mongodb.net/SocialNetwork?retryWrites=true&w=majority';

/**
 * MongoDB database connection
 * it will be exported so we can close the connection 
 * after running the tests
 */

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
    // return the result
    return result.insertedId;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// get all users
const getAllUsers = async () => {
  try {
    const db = await getDB();
    return await db.collection('User').find({}).toArray();
  } catch (err) {
    console.log(`error: ${err.message}`);
}
};

// read a user given their ID
const getUser = async (userID) => {
  try {
    const db = await getDB();
    return await db.collection('User').findOne({ _id: ObjectId(userID) });
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// get a user given their email
// TODO: Test this function
const getUserByEmail = async (email) => {
  try {
    const db = await getDB();
    return await db.collection('User').findOne({ email: email });
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

// Update user password
const updateUser = async (userID, newPassword) => {
  try {
    const db = await getDB();
    return await db.collection('User').updateOne(
      { _id: ObjectId(userID) },
      { $set: { password: newPassword } },
    );
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const deleteUser = async (userID) => {
  try {
    const db = await getDB();
    return await db.collection('User').deleteOne(
      { _id: ObjectId(userID) },
    );
  } catch (err) {
    console.log(`error: ${err.message} `);
  }
};

// TODO: This isn't really efficient but it works for now
// TODO: Test this function
const getSuggestionList = async (userID) => {
  try {
    const users = await getAllUsers();
    const list = [];
    for (let i = 0; i < users.length; i++) {
      const isFollowingMe = await isFollowing(userID, users[i]._id.toHexString());
      if (!isFollowingMe && await hasCommonFollowing(userID, users[i]._id)) {
        list.push(users[i]);
      }
    }
    return list;
  } catch (err) {
    console.trace(err);
  }
}

// checks if user B follows user A
const isFollowing = async (userID, otherUserID) => {
  const user = await getUser(userID);
  const otherUser = await getUser(otherUserID);
  for (let i = 0; i < user.followers.length; i++) {
    if (user.followers[i].equals(otherUser)) {
      return true;
    }
  }
}

const hasCommonFollowing = async (userID, otherUserID) => {
  const otherUser = await getUser(otherUserID);
  let count = 0;
  for (let i = 0; i < otherUser.following.length; i++) {
    if (await isFollowing(otherUser.following[i], userID)) {
      count++;
    }
  }
  return count >= 3;
}

// Test part: use main function to test

// main function to execute our code

/*
const main = async () => {
  const conn = await connect();
  //await createUser( { email: 'rachel', username: 'rachel', password: '1234567777', profilePicture:"", follow: [], id:'1235' });
  //await getAllUsers();
  await getUser('637fc5f683768e86f5852c1c');
  await updateUser('637fc5f683768e86f5852c1c', 'NewPW');
  await getUser('637fc5f683768e86f5852c1c');
  await updateUser('637fc5f683768e86f5852c1c', 'OLDPW');
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
  closeMongoDBConnection, connect, getDB, createUser, getAllUsers, getUser, updateUser, deleteUser,
    getUserByEmail, getSuggestionList
  // closeMongoDBConnection, connect, getDB, createUser, getAllUsers, getUser, updateUser,
};