// getUser.test.js

const request = require('supertest');
// Import MongoDB module
// const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect} = require('../dbUser');
const {failedSignIn, resetFailedSignIns, getLoginAttempts, getUserByUsername, hasCommonFollowing} = require("../dbUser");

// import the express server
const webapp = require('../server');

// connection to the DB
let mongo;

// TEST POST ENDPOINT
describe('GET "/user/:id" endpoint integration test', () => {
    /**
   * If you get an error with afterEach
   * inside .eslintrc.json in the
   * "env" key add -'jest': true-
  */
  let db;
  let testID;
  let testUserTemp;

  //let testUser;
  // test resource to create / expected response
  const loginAttemptsObject = {
    lastAttempt: Date.now(),
    currentNumber: 0
  };

  const testUser = {
    username: "testusername",
    email: "testuser@gmail.com",
    password: "test1234",
    profilePicture: '',
    bio: '',
    followers: [],
    following: [],
    posts: [],
    loginAttemptsObject: loginAttemptsObject,
  };

  const otherUser = {
    username: "otherusername",
    email: "ohteruser@gmail.com",
    password: "test1234",
    profilePicture: '',
    bio: '',
    followers: [],
    following: [],
    posts: [],
    loginAttemptsObject: loginAttemptsObject,
  };
  
  /**
 * Make sure that the data is in the DB before running
 * any test
 * connect to the DB
 */
  beforeAll(async() => {
    mongo = await connect();
    db = mongo.db();
    const res = await request(webapp).post('/signup')
      .send(testUser);
    const other = await request(webapp).post('/signup')
      .send(otherUser);
    
      // eslint-disable-next-line no-underscore-dangle
    // console.log(res);
    testID = JSON.parse(res.text).user.id;
    otherTestID = JSON.parse(other.text).user.id;
    // console.log(testID);
    // testUserTemp = JSON.parse(res.text).data;
  });

  //'email=testemail&username=testusername&password=testpassword&profilePicture=null&follow=null&id=testid'

 /**
 * removes all testing data from the DB
 */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('User').deleteOne({ username: 'testusername' });
      const otherResult = await db.collection('User').deleteOne({ username: 'otherusername' });
      
      console.log('result', result);
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      console.log('error', err.message);
    }
  };
  
/**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    await clearDatabase();
    try {
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Get a user endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/user/${testID}`);
    expect(resp.status).toEqual(200);
    //expect(resp.status).toEqual(404);

    const userEmail = JSON.parse(resp.text).data;
    // testStudent is in the response
    expect(userEmail.email).toEqual("testuser@gmail.com");
  });

  test('isFollowing', async() => {
    const resp = await request(webapp).post('/testisfollowing').send({
      userID: testID,
      otherUserID: "638ce9a41acf9196840abd4f"
    })
    expect(resp.status).toEqual(200);
  });

  test('suggestions', async() => {
    const resp = await request(webapp).post('/testsuggestions').send({
      userID: "638ce9841acf9196840abd4e"
    })
    expect(resp.status).toEqual(200);
  })

  test('failed sign in', async() => {
    const number = await failedSignIn("testuser@gmail.com");
    expect(number).toEqual(0);

    const newResult = await db.collection('User').findOneAndUpdate(
      { email: "testuser@gmail.com" },
      { $set: { "loginAttemptsObject.currentNumber": 3, "loginAttemptsObject.lastAttempt": Date.now() } },
      { returnOriginal: false }
    );
    const newNumber = await failedSignIn("testuser@gmail.com");
    expect(newNumber).toEqual(3);
  })

  test('reset failed sign in', async() => {
    const result = await db.collection('User').findOneAndUpdate(
      { email: "testuser@gmail.com" },
      { $set: { "loginAttemptsObject.currentNumber": 3, "loginAttemptsObject.lastAttempt": Date.now() } },
      { returnOriginal: false }
    );
    const number = await resetFailedSignIns("testuser@gmail.com");
    expect(number).toEqual(0);

    const newResult = await db.collection('User').findOneAndUpdate(
      { email: "testuser@gmail.com" },
      { $set: { "loginAttemptsObject.currentNumber": 1, "loginAttemptsObject.lastAttempt": Date.now() } },
      { returnOriginal: false }
    );
    const newNumber = await resetFailedSignIns("testuser@gmail.com");
    expect(newNumber).toEqual(1);
  })

  test('getLoginAttempts', async() => {
    const result = await db.collection('User').findOneAndUpdate(
      { email: "testuser@gmail.com" },
      { $set: { "loginAttemptsObject.currentNumber": 0, "loginAttemptsObject.lastAttempt": Date.now() } },
      { returnOriginal: false }
    );
    const lastAttemptObject = await getLoginAttempts("testuser@gmail.com");
    expect(lastAttemptObject.currentNumber).toEqual(0);
  })

  test('getUserByUsername', async() => {
    const user = await getUserByUsername("testusername");
    expect(user.email).toEqual("testuser@gmail.com");
  })

  test('has common following', async() => {
    const result = await hasCommonFollowing(testID, otherTestID);
    expect(result).toBe(false);
  })

  test('get user name', async() => {
    const resp = await request(webapp).get(`/User-Name/testusername`);
    expect(resp.status).toEqual(200);
  })

});