// import supertest
const request = require('supertest');

const { ObjectId } = require('mongodb');

// import the function to close the mongodb connection
const { closeMongoDBConnection, connect } = require('../dbFollow&Comments');


// import the express server
const webapp = require('../server');

// connection to the DB
let mongo;

describe('PUT enpoint tests', () => {
  let db; // the db
  let response; // the response from our express server
  let testId;
  /**
     * We need to make the request to the endpoint
     * before running any test.
     * We need to connecto the DB for all the DB checks
     * If beforeAll is undefined
     * inside .eslintrc.js, add 'jest' to the 'env' key
     */
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();
    // send the request to the API and collect the response
    response = await request(webapp).post('/comments')
      .send({
        message: 'testcomment', username: 'testusername', tagOfOtherUsers: 'testtag', id: 'testid',
      });
    testId = JSON.parse(response.text).data._id;
  });
  /**
 * removes all testing data from the DB
 */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('Comment').deleteOne({ username: 'testuser' });
      console.log('result', result);
    } catch (err) {
      console.log('error', err.message);
    }
  };

  /**
 * After running the tests, we need to remove any test data from the DB
 * We need to close the mongodb connection
 */
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
 * change the message of this new comment
 */
  test('change the message of this new comment', async () => {
    expect(response.status).toBe(201); // status code
    // expect the new comment added successfully

    response = await request(webapp).put(`/comments/${testId}`)
      .send({
        message: 'updatedMessage',
      });
    //'message=updatedMessage'
    expect(response.status).toEqual(200);
    expect(response.type).toBe('application/json');

    const updatedComment = await db.collection('Comment').findOne({ _id: ObjectId(testId) });
    expect(updatedComment.message).toEqual('testcomment');
  });

  test('missing message 404', async () => {
    response = await request(webapp).put(`/comments/${testId}`)
      .send('major=music');
    expect(response.status).toEqual(404);
  });
});
