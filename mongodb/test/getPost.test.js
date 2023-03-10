const request = require('supertest');
// Import MongoDB module
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect} = require('../dbFollow&Comments');
const webapp = require('../server');

let mongo;

// TEST PUT ENDPOINT
describe('Post endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
 */

  let res;
  let db;
  const testUsername = "grp3foreva";
  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    response = await request(webapp).post('/post')
    .send({
        username: 'testname', postImage: 'testimage', postCaption: 'testdescription', publicPrivate: false, postTagOfOtherUsers: [], postCommentArray: [], postLikeArray: [], like: [],
    });
    testPostID = JSON.parse(response.text).data._id;

  });


  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      const result = await db.collection('Post').deleteOne({ username: 'testname' });
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Endpoint status code and response async/await', async () => {
    // testing getPost
    res = await request(webapp).get('/post/0');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    res = await request(webapp).get('/postAll/0');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');


    // // // testing getUserPost
    res = await request(webapp).get('/userposts/testname');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // // // testing getUsers
    res = await request(webapp).get('/users');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // // // testing getSuggestionList
    res = await request(webapp).get('/friendsuggestion');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // testing getPost
    res = await request(webapp).get( `/post/${testPostID}`);
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');
    
    // testing hasCommonFollowings
    // res = await request(webapp).get('/commonfollowings').send('user={"_id":"637aaadf3f3f430d2ce0accb","email":"newEmail@com","username":"newUsername","password":"newPassword","profilePicture":"","follow":"","id":"mit2SjY"}');
    // expect(res.status).toEqual(200);
    // expect(res.type).toBe('application/json');


  });

  test('test private public', async () => {
    const resp = await request(webapp).put(`/Post/${testPostID}/true`);
    expect(resp.status).toEqual(200);
  });
});