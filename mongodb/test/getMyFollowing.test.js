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
  let testUserId;
  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    const response = await request(webapp).post('/user')
        .send({
          email: 'testemail', username: 'testusername', password: 'testpassword', profilePicture: 'null', follow: 'null', id: 'testid',
        });
    
    console.log("response for user is ", JSON.parse(response.text).data._id);
    testUserId =  JSON.parse(response.text).data._id;
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
    res = await isMyFollowing(testUserId, testUsername);
    // this testUsername initially doesn't exist in the follow list
    expect(res).toBe(false);
    
    res = await request(webapp).put('/followinglist').set('x-auth-token', '1234').send({
        followingName: "suhdadhaskjdhaskjdsah123",
      testid: "testid",
      });
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    res = await request(webapp).get('/followinglist').set('x-auth-token', '1234')
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');
  });

 
});