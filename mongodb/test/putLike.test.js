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
  let postId;
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
                username: 'test123', postImage: 'testimage', postCaption: 'testdescription', publicPrivate: false, postTagOfOtherUsers: [], postCommentArray: [], postLikeArray: [], like: [],
            });
    postId = JSON.parse(response.text).data._id;
    console.log("Post id is ", postId);
  });


  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      const resultUser = db.collection('User').updateOne(
        { username: 'test123' },
        {
          $pull: { posts: ObjectId(JSON.parse(response.text).data._id) },
        },
      );
      const result = await db.collection('Post').deleteOne({ username: 'test123' });
      console.log('resultUser', resultUser);
      console.log('result', result);
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Endpoint status code and response async/await', async () => {    
    res = await request(webapp).put('/postlike').set('x-auth-token', '1234')
      .send({
        PostId: ObjectId(postId),
        UserId: ObjectId("638d46c33ab44b7693a40000")
      });
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    const likedPost = await db.collection('Post').findOne({_id:ObjectId(postId)});
    const likeLength = Object.values(likedPost.like).length;
    expect(Object.values(likedPost.like)[0]).toEqual(ObjectId('638d46c33ab44b7693a40000'));

    res = await request(webapp).put('/postunlike').set('x-auth-token', '1234')
      .send({
        PostId: ObjectId(postId),
        UserId: ObjectId("638d46c33ab44b7693a40000")
      });
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    const likedPostNew = await db.collection('Post').findOne({_id:ObjectId(postId)});
    expect(Object.values(likedPostNew.like).length).toBeLessThan(likeLength);

    res = await request(webapp).put('/isMyLikePost')
      .send({
        PostId: ObjectId(postId),
        UserId: ObjectId("638d46c33ab44b7693a40000")
      });
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

  });

});