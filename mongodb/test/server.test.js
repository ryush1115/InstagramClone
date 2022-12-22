// getUser.test.js

const request = require('supertest');
// Import MongoDB module
// const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect} = require('../dbUser');

// import the express server
const webapp = require('../server');

// connection to the DB
let mongo;

// TEST POST ENDPOINT
describe('server test', () => {
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
    const otherres = await request(webapp).post('/signup')
      .send(otherUser);
    response = await request(webapp).post('/post')
    .send({
        username: 'testname', postImage: 'testimage', postCaption: 'testdescription', publicPrivate: false, postTagOfOtherUsers: [], postCommentArray: [], postLikeArray: [], like: [],
    });
    testPostID = JSON.parse(response.text).data._id;
    
    testID = JSON.parse(res.text).user.id;
    otherTestID = JSON.parse(otherres.text).user.id;
    
  });

 /**
 * removes all testing data from the DB
 */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('User').deleteOne({ username: 'testusername' });
      const otherResult = await db.collection('User').deleteOne({ username: 'otherusername' });
      const resultPost = await db.collection('Post').deleteOne({ username: 'testname' });
      
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

  test('Invalid token', async () => {
    const resp = await request(webapp).get(`/checktoken`).set('x-auth-token', '1234');
    expect(resp.status).toEqual(401);
  });

  test('testisfollowing', async () => {
    const resp = await request(webapp).post('/testisfollowing').send({
        userID: testID,
        otherUserID: otherTestID
      })
      expect(resp.status).toEqual(200);
  });

  test('testsuggestions', async () => {
    const resp = await request(webapp).post('/testsuggestions').send({
        userID: testID,
      })
      expect(resp.status).toEqual(200);
  });

  test('gettokenuser', async () => {
    const resp = await request(webapp).get('/gettokenuser').set('x-auth-token', '1234')
      expect(resp.status).toEqual(401);
    const respNull = await request(webapp).get('/gettokenuser').set('x-auth-token', '')
      expect(respNull.status).toEqual(401);
  });

  test('test private public', async () => {
    const resp = await request(webapp).put(`/Post/${testPostID}/true`);
    expect(resp.status).toEqual(200);

    const respError = await request(webapp).put(`/Post/wrongpostid`);
    expect(respError.status).toEqual(401);
  });

  test('put post', async () => {
    const resp = await request(webapp).put(`/post/${testPostID}`).set('x-auth-token', '1234');
    expect(resp.status).toEqual(404);
  });

  test('get user name', async() => {
    const resp = await request(webapp).get(`/User-Name/testusername`);
    expect(resp.status).toEqual(200);
  })




});