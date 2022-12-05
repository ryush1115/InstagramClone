// updateUser.test.js

const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');

const { closeMongoDBConnection, connect } = require('../dbUser');

// import the express server
const webapp = require('../server');

// connection to the DB
let mongo;

describe('PUT enpoint tests', () => {
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
    //'email=testemail&username=testusername&password=testpassword&profilePicture=null&follow=null&id=testid'
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

  test('change the pw of this new user', async () => {
    expect(response.status).toBe(201); // status code
    // expect new user to be added successfully

    response = await request(webapp).put(`/user/${testUserID}`)
      .send({
        password: "myNEWpassword",
      });
    expect(response.status).toEqual(200);
    expect(response.type).toBe('application/json');

    // the database was updated
    const updatedUser = await db.collection('User').findOne({ _id: ObjectId(testUserID)});
    expect(updatedUser.password).toEqual('myNEWpassword');

  });

  test('missing field major leads to a 404', async () => {
    response = await request(webapp).put(`/user/${testUserID}`)
      .send('major=music');
    expect(response.status).toEqual(404);
  });
});