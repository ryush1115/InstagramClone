const request = require('supertest');
// Import MongoDB module
const { ObjectId, ObjectID } = require('mongodb');
const { closeMongoDBConnection, connect} = require('../dbFollow&Comments');
const webapp = require('../server');

let mongo;

// TEST PUT ENDPOINT
describe('Update a like list endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
 */

  let res;
  let db;
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
    res = await request(webapp).put('/postlike')
      .send({
        PostId: ObjectId("6393d0e10bb4641f458b4d91"),
        UserId: ObjectId("638d46c33ab44b7693a40000")
      });
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    const likedPost = await db.collection('Post').findOne({_id:ObjectId("6393d0e10bb4641f458b4d91")});
    const likeLength = Object.values(likedPost.like).length;
    expect(Object.values(likedPost.like)[0]).toEqual(ObjectId('638d46c33ab44b7693a40000'));

    res = await request(webapp).put('/postunlike')
      .send({
        PostId: ObjectId("6393d0e10bb4641f458b4d91"),
        UserId: ObjectId("638d46c33ab44b7693a40000")
      });
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    const likedPostNew = await db.collection('Post').findOne({_id:ObjectId("6393d0e10bb4641f458b4d91")});
    expect(Object.values(likedPostNew.like).length).toBeLessThan(likeLength);

    res = await request(webapp).put('/isMyLikePost')
      .send({
        PostId: ObjectId("6393d0e10bb4641f458b4d91"),
        UserId: ObjectId("638d46c33ab44b7693a40000")
      });
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

  });

});