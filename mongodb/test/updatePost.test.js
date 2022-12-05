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
    let testPostID;

    beforeAll(async () => {
        // connect to the db
        mongo = await connect();
        // get the db
        db = mongo.db();
        // send the request to the API and collect the response
        response = await request(webapp).post('/post')
            .send({
                username: 'testname', postImage: 'testimage', postCaption: 'testdescription', publicPrivate: false, postTagOfOtherUsers: [], postCommentArray: [], postLikeArray: [], like: [],
            });
        //'email=testemail&username=testusername&password=testpassword&profilePicture=null&follow=null&id=testid'
        // eslint-disable-next-line no-underscore-dangle
        testPostID = JSON.parse(response.text).data._id;
    });

    /**
     * removes all testing data from the DB
     */
    const clearDatabase = async () => {
        try {
            const result = await db.collection('Post').deleteOne({ username: 'testname' });
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

    test('change the caption of this new post', async () => {
        expect(response.status).toBe(201); // status code
        // expect new post to be added successfully

        const post = await db.collection('Post').findOne({ _id: ObjectId(testPostID) });

        const updatedPost = {
            username: post.username, postImage: post.postImage, postCaption: 'newcaption', publicPrivate: false, postTagOfOtherUsers: [], postCommentArray: [], postLikeArray: [], like: [],
        }

        response = await request(webapp).put(`/post/${testPostID}`).set('x-auth-token', '1234')
            .send(updatedPost);
        expect(response.status).toEqual(200);
        expect(response.type).toBe('application/json');

        // the database was updated
        const updatedPost2 = await db.collection('Post').findOne({ _id: ObjectId(testPostID)});
        expect(updatedPost2.postCaption).toEqual('newcaption');

    });

    test('missing field major leads to a 404', async () => {
        response = await request(webapp).put(`/post/${testPostID}`).set('x-auth-token', '1234')
            .send({
                postCaption: "newcaption"
            });
        expect(response.status).toEqual(404);
    });
});