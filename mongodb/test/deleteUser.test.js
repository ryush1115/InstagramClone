// deleteUser.test.js

const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../dbUser');

// import the express server
const webapp = require('../server');

// connection to the DB
let mongo;

describe('DELETE endpoint integration tests', () => {
  let db;
  let response;
  let testUserID;
  
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();
    // send the request to the API and collect the response
    response = await request(webapp).post('/user')
      .send({
        email: 'testemail', username: 'testusername', password: 'testpassword', profilePicture: 'null', follow: 'null', id: 'testid',
      });
    // eslint-disable-next-line no-underscore-dangle
    testUserID = JSON.parse(response.text).data._id;
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

  test('Endpoint response: status code, type and content', async () => {
    // successful deletion returns 200 status code
    const resp = await request(webapp).delete(`/user/${testUserID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // the user is not in the database
    const resp1 = await db.collection('User').findOne({ _id: ObjectId(testUserID) });
    expect(resp1).toBeNull();
  });

  // test('wrong user id format/exception - response 404', async () => {
  //   const resp = await request(webapp).delete('/user/1**9');
  //   expect(resp.status).toEqual(404);
  // });

  // test('missing message 404', async () => {
  //   const resp = await request(webapp).delete('/user/63738b602fe72e59d4a72ccc');
  //   expect(resp.status).toEqual(404);
  // });
});