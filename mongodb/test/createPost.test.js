// createUser.test.js

const { ObjectId } = require('mongodb');
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
    let responseUser;
    /**
     *  we need to connect to the db
     */
    beforeAll(async () => {
        // connect to the db
        mongo = await connect();
        // get the db
        db = mongo.db();
        // send the request to the API and collect the response
        response = await request(webapp).post('/post')
            .send({
                username: 'test123', postImage: 'testimage', postCaption: 'testdescription', publicPrivate: false, postTagOfOtherUsers: [], postCommentArray: [], postLikeArray: [], like: [],
            });
    });

    /**
     * removes all testing data from the DB
     */
    const clearDatabase = async () => {
        try {
            const resultUser = db.collection('User').updateOne(
                { username: 'test123' },
                {
                  $pull: { posts: ObjectId(JSON.parse(response.text).data.id.insertedId) },
                },
              );
 
            const result = await db.collection('Post').deleteOne({ username: 'test123' });
            console.log('resultUser', resultUser);
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
    test('the new post is created', () => {
        const testPost = {
            username: 'test123', postImage: 'testimage', postCaption: 'testdescription', publicPrivate: false, postTagOfOtherUsers: [], postCommentArray: [], postLikeArray: [], like: [],
        };
        expect(JSON.parse(response.text).data).toMatchObject(testPost); // status code
    });

    test('The new post is in the database', async () => {
        const createdPost = await db.collection('Post').findOne({ username: 'test123' });
        expect(createdPost.username).toEqual('test123');
    });

    test('missing a field (image) 404', async () => {
        const res = await request(webapp).post('/user')
            .send({
                username: 'test123', postCaption: 'testdescription', publicPrivate: false, postTagOfOtherUsers: [], postCommentArray: [], postLikeArray: [], like: [],
            });
        expect(res.status).toEqual(404);
    });

    test ('post is deleted', async () => {
        const postId = JSON.parse(response.text).data._id
        const res = await request(webapp).delete(`/Post/${postId}`) 
        expect(res.status).toEqual(200);
    })

});
