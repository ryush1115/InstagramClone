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
  const testUser = { email: 'testemail', username: 'testusername', password: 'testpassword', profilePicture: 'null', follow: 'null', id: 'testid' };
// test resource to create / expected response


/**
 * Make sure that the data is in the DB before running
 * any test
 * connect to the DB
 */
  beforeAll(async() => {
    mongo = await connect();
    db = mongo.db();
    const res = await request(webapp).post('/user')
      .send({
        email: 'testemail', username: 'testusername', password: 'testpassword', profilePicture: 'null', follow: 'null', id: 'testid',
      });
    // eslint-disable-next-line no-underscore-dangle
    //testID = JSON.parse(res.text).data._id;
    // eslint-disable-next-line no-underscore-dangle
    testUserID = JSON.parse(res.text).data._id;
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
    expect(userArray).toEqual(expect.arrayContaining([{ _id: testUserID, ...testUser }]));
  });
});