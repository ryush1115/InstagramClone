// import supertest
const request = require('supertest');
// import the function to close the mongodb connection
const { closeMongoDBConnection, connect } = require('../dbFollow&Comments');

// import the express server
const webapp = require('../server');

// connection to the DB
let mongo;

describe('POST enpoint tests', () => {
  let db; // the db
  let response; // the response from our express server
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
        username: 'Junwei',
        message: 'Hello World',
        tagOfOtherUsers: ['Junwei', 'Junwei'],
        id: 'testid'
      });
    //'username=testuser&message=testmessage&tagOfOtherUsers=testtag&id=testid'
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
 * Status code and response type
 */
  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });

  /**
 * response body
 */
  test('the new comment is returned', () => {
    const testComment = {
      username: 'Junwei', message: 'Hello World', tagOfOtherUsers: ['Junwei', 'Junwei'], id: 'testid',
    };
    expect(JSON.parse(response.text).data).toMatchObject(testComment); // status code
  });

  test('The new comment is in the database', async () => {
    const insertedComment = await db.collection('Comment').findOne({ username: 'Junwei' });
    expect(insertedComment.username).toEqual('Junwei');
  });

  test('missing a field (email) 404', async () => {
    const res = await request(webapp).post('/comments')
      .send('username=testuser&message=cis');
    expect(res.status).toEqual(404);
  });
});
