const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect, isMyFollowing} = require('../dbFollow&Comments');
const webapp = require('../server');

let mongo;

// TEST PUT ENDPOINT
describe('Update a following list endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
 */

  let res;
  let db;
  const testUsername = "suhdadhaskjdhaskjdsah123";
  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();

  });


  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Endpoint status code and response async/await', async () => {
    res = await isMyFollowing(testUsername);
    // this testUsername initially doesn't exist in the follow list
    expect(res).toBe(false);
    
    res = await request(webapp).put('/followinglist')
      .send('followingName=suhdadhaskjdhaskjdsah123');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    res = await request(webapp).get('/followinglist');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');
    const followArr = JSON.parse(res.text).data;
    expect(followArr).toEqual(expect.arrayContaining([testUsername]));
    // now this testUsername is expected to be in the following list

    // unfollow this test user (clear database)
    res = await request(webapp).put('/followinglist')
      .send('followingName=suhdadhaskjdhaskjdsah123');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    res = await isMyFollowing(testUsername);
    expect(res).toBe(false);
    // now this testUsername is unfollowed again


  });

 
});