// Express app file

// (1) import express
// backend ==> require
const express = require('express');

// (2) import and enable cors
// (cross-origin resource sharing)
const cors = require('cors');

// (3) create an instanece of our express app
const webapp = express();

// (4) enable cors
webapp.use(cors());

// (6) configure express to parse bodies
webapp.use(express.urlencoded({ extended: true }));

// (7) import the db interactions module
const dbLib = require('./dbFollow&Comments');
const dbLibPost = require('./dbPost');
const dbLibLike = require('./dbLike');

// import the db interactions modules
const dbLibUser = require('./dbUser');

/*
// start the server and connect to the DB
webapp.listen(port, async () => {
  db = await dbLib.connect();
  console.log(`Server running on port: ${port}`);
});
*/

// root endpoint / route
webapp.get('/', (req, resp) => {
  resp.json({ message: 'welcome to our backend!!!' });
});

// implement the GET in /followinglist endpoint
webapp.get('/followinglist', async (req, res) => {
  console.log('READ all followings');
  try {
    // get the data from the db
    const results = await dbLib.getMyFollowing();
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

webapp.get('/commonfollowings', async (req, res) => {
  console.log('Get if has common followings');
  try {
    // get the data from the db
    const results = await dbLibPost.hasCommonFollowings(req.body.user);
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// update the follow list in /followinglist endpoint
webapp.put('/followinglist', async (req, res) => {
  console.log('UPDATE the follow list');
  // parse the body of the request
  if (!req.body.followingName) {
    res.status(404).json({ message: 'missing following name' });
    return;
  }
  try {
    const isAlreadyFollow = await dbLib.isMyFollowing(req.body.followingName);
    let result;
    if (!isAlreadyFollow) {
      result = await dbLib.followUser(req.body.followingName);
    } else {
      result = await dbLib.unfollowUser(req.body.followingName);
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// update the follow list in /friendsuggestion endpoint
webapp.put('/friendsuggestion', async (req, res) => {
  console.log('UPDATE the follow list');
  // parse the body of the request
  if (!req.body.followingName) {
    res.status(404).json({ message: 'missing following name' });
    return;
  }
  try {
    const isAlreadyFollow = await dbLib.isMyFollowing(req.body.followingName);
    let result;
    if (!isAlreadyFollow) {
      result = await dbLib.followUser(req.body.followingName);
    } else {
      result = await dbLib.unfollowUser(req.body.followingName);
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// implement the GET in /activity-feed/:id/comment endpoint
webapp.get('/activity-feed/:id/comment', async (req, res) => {
  console.log('READ the comments of one post bt postId');
  try {
    // get the data from the db
    const results = await dbLib.getCommentsArray(req.params.id);
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// implement the GET in /comments/:id endpoint
webapp.get('/comments/:id', async (req, res) => {
  console.log('READ the comment by commentId');
  try {
    // get the data from the db
    const results = await dbLib.getCommentMessage(req.params.id);
    // send the response with the appropriate status code
    if (results === undefined) {
      res.status(404).json({ error: 'unknown student' });
      return;
    }
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// implement the POST in /comments endpoint
webapp.post('/comments', async (req, res) => {
  console.log('CREATE a comment');
  // parse the body of the request
  if (!req.body.username || !req.body.message || !req.body.tagOfOtherUsers || !req.body.id) {
    res.status(404).json({ message: 'missing username, message,tagOfOtherUsers, or id' });
    return;
  }
  try {
    // create the new comment
    const newComment = {
      username: req.body.username,
      message: req.body.message,
      tagOfOtherUsers: req.body.tagOfOtherUsers,
      id: req.body.id,
    };
    const result = await dbLib.createComment(newComment);
    // send the response with the appropriate status code
    res.status(201).json({ data: { id: result, ...newComment } });
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

// implement the POST in /activity-feed/:id/comment endpoint
webapp.post('/activity-feed/:id/comment', async (req, res) => {
  console.log('CREATE a comment in a post by postId');
  // parse the body of the request
  if (!req.body.username || !req.body.message || !req.body.tagOfOtherUsers || !req.body.id) {
    res.status(404).json({ message: 'missing username, message,tagOfOtherUsers, or id' });
    return;
  }
  try {
    // create the new student
    const newComment = {
      username: req.body.username,
      message: req.body.message,
      tagOfOtherUsers: req.body.tagOfOtherUsers,
      id: req.body.id,
    };
    const result = await dbLib.createCommentInPost(req.params.id, newComment);
    // send the response with the appropriate status code
    res.status(201).json({ data: { id: result, ...newComment } });
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});


// implement the PUT /comments/id endpoint
webapp.put('/comments/:id', async (req, res) => {
  console.log('UPDATE a comment');
  // parse the body of the request
  if (!req.body.message) {
    res.status(404).json({ message: 'missing message' });
    return;
  }
  try {
    const result = await dbLib.updateComment(req.body.message, req.params.id);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// implement the GET in /posts endpoint
webapp.get('/post', async (req, res) => {
  console.log('READ all posts');
  try {
    // get the data from the db
    const results = await dbLibPost.getPosts();
    // send the response with the appropriate status code
    // console.log(results.username);
    
    console.log(`All posts: ${JSON.stringify(results)}`);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

webapp.get('/post/:id', async (req, res) => {
  console.log('READ the post by postId');
  try {
    // get the data from the db
    const results = await dbLibPost.getPost(req.params.id);
    // send the response with the appropriate status code
    if (results === undefined) {
      res.status(404).json({ error: 'unknown post' });
      return;
    }
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});


webapp.get('/userposts', async (req, res) => {
  console.log('READ user posts');
  try {
    // get the data from the db
    const results = await dbLibPost.getUserPosts(req.body.username);
    console.log(req.body.username);
    // send the response with the appropriate status code
    // console.log(results.username);
    
    // console.log(`All posts: ${JSON.stringify(results)}`);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// implement the GET in /posts endpoint
webapp.get('/users', async (req, res) => {
  console.log('READ all users');
  try {
    // get the data from the db
    const results = await dbLibPost.getUsers();
    // send the response with the appropriate status code
    // console.log(results.username);
    
    console.log(`All posts: ${JSON.stringify(results)}`);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

webapp.get('/friendsuggestion', async (req, res) => {
  console.log('READ all friend suggestions');
  try {
    // get the data from the db
    const results = await dbLibPost.getSuggestionList();
    // send the response with the appropriate status code
    // console.log(results.username);
    
    console.log(`All friend suggestions: ${JSON.stringify(results)}`);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// get results for is my like post
webapp.get('/ismylikepost', async (req, res) => {
  console.log('Run is my like post');
  try {
    // get the data from the db
    const results = await dbLibLike.isMyLikePost(req.body.PostId);
    // send the response with the appropriate status code
    // console.log(results.username);
    
    console.log(`is my like post result: ${JSON.stringify(results)}`);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// update the like array in post endpoint
webapp.put('/postlike', async (req, res) => {
  console.log('UPDATE the like array');
  try {
    result = await dbLibLike.incrementPostLike(req.body.PostId);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// update the like array in post endpoint
webapp.delete('/postlike', async (req, res) => {
  console.log('Delete a like from the like array');
  try {
    result = await dbLibLike.cancelPostLike(req.body.PostId);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});


// implement the POST User endpoint
webapp.post('/user/', async (req, res) => {
  console.log('CREATE a user');
  // parse the body of the request to make surea all fields are present
  // eslint-disable-next-line max-len
  if (!req.body.email || !req.body.username || !req.body.password || !req.body.profilePicture || !req.body.follow || !req.body.id) {
    res.status(404).json({ message: 'missing email, username, password, profilePicture, follow or id' });
    return;
  }
  try {
    // create new user
    const newUser = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      profilePicture: req.body.profilePicture,
      follow: req.body.follow,
      id: req.body.id,
    };
    const result = await dbLibUser.createUser(newUser);
    // send the response with the appropriate status code
    res.status(201).json({ data: { id: result, ...newUser } });
  } catch (err) {
    res.status(409).json({ message: 'there was error' });
  }
});

// implement the DELETE User endpoint
webapp.delete('/user/:id', async (req, res) => {
  console.log('DELETE a user');
  // parse the body of the request to make surea all fields are present
  // eslint-disable-next-line max-len

  try {
    const result = await dbLibUser.deleteUser(req.params.id);
    // send the response with the appropriate status code
    res.status(200).json({ messsage: result });
  } catch (err) {
    res.status(404).json({ message: 'there was an error' });
  }
});

// implement the UPDATE User endpoint password
webapp.put('/user/:id', async (req, res) => {
  console.log('Update a user');
  // parse the body of the request to make surea all fields are present
  if (!req.body.password ) {
    res.status(404).json({ message: 'missing password' });
    return;
  }
  // eslint-disable-next-line max-len

  try {
    const result = await dbLibUser.updateUser(req.params.id, req.body.password);
    // send the response with the appropriate status code
    res.status(200).json({ messsage: result });
  } catch (err) {
    res.status(404).json({ message: 'there was an error' });
  }
});


// implement the GET Users endpoint
webapp.get('/allusers', async ( req, res ) => {
  console.log('READ all students');
  try {
    const result = await dbLibUser.getAllUsers();
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ message: 'there was an error' });
  }
});

// implement the GET a User endpoint
webapp.get('/user/:id', async ( req, res ) => {
  console.log('GET a student');
  try {
    const result = await dbLibUser.getUser(req.params.id);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ message: 'invalid user id' });
  }
});

// catch all endpoint
webapp.use((req, resp) => {
  resp.status(404).json({ error: 'invalid endpoint' });
});

// do not forget to export the express server
module.exports = webapp;
