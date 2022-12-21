// getAllUsers.test.js

const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect} = require('../dbUser');

// import the express server
const webapp = require('../server');

// connection to the DB
let mongo;

// TEST POST ENDPOINT
describe('GET "/users" endpoint integration test', () => {

  /**
   * If you get an error with afterEach
   * inside .eslintrc.json in the
   * "env" key add -'jest': true-
   */
  let db;
  let testUserID;
  const testUser = {
    username:"testusername",
    email:"test@gmail.com",
    password: "test1234",
    profilePicture: '',
    bio: '',
    followers: [],
    following: [],
    posts: [],
  };

/**
 * Make sure that the data is in the DB before running
 * any test
 * connect to the DB
 */
  beforeAll(async() => {
    mongo = await connect();
    db = mongo.db();
    const newUser = {
      username:"testusername",
      email:"test@gmail.com",
      password: "test1234",
      profilePicture: '',
      bio: '',
      followers: [],
      following: [],
      posts: [],
    };
    response = await request(webapp).post('/signup')
      .send(newUser);
    testUserID = JSON.parse(response.text).user.id;
  });

   /**
 * removes all testing data from the DB
 */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('User').deleteOne({ username: 'testusername' });
      console.log('result', result);
    } catch (err) {
      console.log('error', err.message);
    }
  };


  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
  // eslint-disable-next-line no-undef
  await clearDatabase();
    try {
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Get a user endpoint status code and data', async () => {
    const resp = await request(webapp).get('/users');
    expect(resp.status).toEqual(200);
    //expect(resp.status).toEqual(404);

    const userArray = JSON.parse(resp.text).data;
    // testStudent is in the response
    expect(userArray).toEqual(          // 1
    expect.arrayContaining([      // 2
      expect.objectContaining({   // 3
        _id: testUserID               // 4
      })
    ])
  )

  });
});