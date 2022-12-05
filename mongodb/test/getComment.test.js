const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../dbFollow&Comments');
const webapp = require('../server');

let mongo;

// TEST POST ENDPOINT
describe('GET "/comments/:id" endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db;
  let testID;
  let testMessage;
  // test resource to create / expected response
  const testComment = {
    username: 'testuser', message: 'testmessage', tagOfOtherUsers: 'testtag', id: 'testid',
  };
  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    const res = await request(webapp).post('/comments')
      .send({
        username: 'testuser', message: 'testmessage', tagOfOtherUsers: 'testtag', id: 'testid',
      });
    // eslint-disable-next-line no-underscore-dangle
    testID = JSON.parse(res.text).data._id;
    testMessage = JSON.parse(res.text).data.message;
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('Comment').deleteOne({ username: 'testuser' });
      const { deletedCount } = result;
      if (deletedCount === 1) {
        console.log('info', 'Successfully deleted test student');
      } else {
        console.log('warning', 'test student was not deleted');
      }
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

  test('Get a comment endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/comments/${testID}`);
    expect(resp.status).toEqual(200);
    const commentMessage = JSON.parse(resp.text).data;
    // testStudent is in the response
    expect(commentMessage).toEqual(testMessage);
  });

  test('user not in db status code 404', async () => {
    const resp = await request(webapp).get('/comments/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });
});