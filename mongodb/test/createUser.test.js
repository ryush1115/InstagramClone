// createUser.test.js

const request = require('supertest');
// Import MongoDB module
// const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../dbUser');

// import the express server
const webapp = require('../server');

// connection to the DB
let mongo;

describe('POST enpoint tests', () => {
  let db; // the db
  let response;
  /**
  *  we need to connect to the db
  */
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();
    // send the request to the API and collect the response
    response = await request(webapp).post('/user')
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

/**
 * Status code and response type
 */
  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });

  /**
 * response body
 */
  test('the new user is returned', () => {
    const testUser = {
      email: 'testemail', username: 'testusername', password: 'testpassword', profilePicture: 'null', follow: 'null', id: 'testid',
    };
    expect(JSON.parse(response.text).data).toMatchObject(testUser); // status code
  });

  test('The new user is in the database', async () => {
    const createdUser = await db.collection('User').findOne({ username: 'testusername' });
    expect(createdUser.username).toEqual('testusername');
  });

  test('missing a field (email) 404', async () => {
    const res = await request(webapp).post('/user')
      .send('username=testuser&message=cis');
    expect(res.status).toEqual(404);
  });
});
