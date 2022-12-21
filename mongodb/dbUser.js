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
    console.trace(err);
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
      console.log(users[i]._id);
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
// TODO: Fix the weird error this throws
const isFollowing = async (userID, otherUserID) => {
  const user = await getUser(userID);
  const otherUser = await getUser(otherUserID);
  if (!!user.followers) {
    for (let i = 0; i < user.followers.length; i++) {
      if (user.followers[i].equals(otherUser)) {
        return true;
      }
    }
    return false;
  }
  return false;
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

const getUserByUsername = async (username) => {
  try {
    const db = await getDB();
    return await db.collection('User').findOne({ username: username });
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

const failedSignIn = async (email) => {
  try {
    const db = await getDB();
    const user = await db.collection('User').findOne({ email: email });
    if (user.loginAttemptsObject.currentNumber < 3) {
      const updatedUser = await db.collection('User').findOneAndUpdate(
          { email: email },
          { $inc: { "loginAttemptsObject.currentNumber": 1 }, $set: {"loginAttemptsObject.lastAttempt": Date.now() } },
          { returnOriginal: false }
      );
      return updatedUser.value.loginAttemptsObject.currentNumber;
    } else {
      const updatedUser = await db.collection('User').findOneAndUpdate(
          { email: email },
          { $set: {"loginAttemptsObject.lastAttempt": Date.now() } },
          { returnOriginal: false }
      );
      return updatedUser.value.loginAttemptsObject.currentNumber;
    }
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

const resetFailedSignIns = async (email) => {
  try {
    const db = await getDB();
    const updatedUser = await db.collection('User').findOne({ email: email });
    if (updatedUser.loginAttemptsObject.currentNumber === 3) {
      // If it is, set it to 0
      const result = await db.collection('User').findOneAndUpdate(
          { email: email },
          { $set: { "loginAttemptsObject.currentNumber": 0, "loginAttemptsObject.lastAttempt": Date.now() } },
          { returnOriginal: false }
      );
      return result.value.loginAttemptsObject.currentNumber;
    } else {
      return updatedUser.loginAttemptsObject.currentNumber;
    }
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

const getLoginAttempts = async (email) => {
    try {
      const db = await getDB();
      const user = await db.collection('User').findOne({email: email});
      return user.loginAttemptsObject;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }
}

module.exports = {
  closeMongoDBConnection, connect, getDB, createUser, getAllUsers, getUser, updateUser, deleteUser,
  getUserByEmail, getSuggestionList, isFollowing, getUserByUsername, failedSignIn, resetFailedSignIns,
  getLoginAttempts
};