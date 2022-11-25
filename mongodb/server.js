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
    // create the new student
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


// catch all endpoint
webapp.use((req, resp) => {
  resp.status(404).json({ error: 'invalid endpoint' });
});

// do not forget to export the express server
module.exports = webapp;
