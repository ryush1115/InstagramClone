// deleteUser.test.js

const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect} = require('../dbUser');

// import the express server
const webapp = require('../server');

// connection to the DB
let mongo;

describe('DELETE enpoint tests', () => {
  let db;
  let response;
  let testId_;
  
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();
    // send the request to the API and collect the response
  response = await request(webapp).put('/users')
    .send('email=testemail&username=testusername&password=testpassword&profilePicture=null&follow=null&id=testid');
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
   * After running the tests, we need to remove any test data from the DB
   * We need to close the mongodb connection
   */
    // eslint-disable-next-line consistent-return
  afterAll(async () => {
    // we need to clear the DB
    try {
      await clearDatabase();
      await mongo.close(); // the test  file connection
      await closeMongoDBConnection(); // the express connection
    } catch (err) {
      return err;
    }
  });

  test('missing message 404', async () => {
    response = await request(webapp).delete(`/users/${testId_}`);
    expect(response.status).toEqual(404);
  });
});