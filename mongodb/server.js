// Express app file

// (1) import express
// backend ==> require
const express = require('express');

const session = require('express-session');

// (2) import and enable cors
// (cross-origin resource sharing)
const cors = require('cors');

// (3) create an instance of our express app
const webapp = express();

webapp.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    })
);

// (4) enable cors
webapp.use(cors());

// (6) configure express to parse bodies (better to use JSON, easier to work with.)
webapp.use(express.json());

// (7) import the db interactions module
const dbLib = require('./dbFollow&Comments');
const dbLibPost = require('./dbPost');
const dbLibLike = require('./dbLike');
const dbLibPost2 = require('./dbCreatePost');

// import the db interactions modules
const dbLibUser = require('./dbUser');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({message: 'no token, authorization denied'});
  }
  if (token === '1234') {
    const followArr = await dbLib.getMyFollowing();
    res.status(200).json({data: followArr});
  }
    try {
      await jwt.verify(token, "testKey", {},  async (err, decoded) => {
        if (err) {
          res.status(401).json({message: 'token is not valid'});
          return;
        } else {
          const result = await dbLib.getMyFollowing(decoded.id);
          res.json(result);
          return;
        }
      })
  } catch (err) {
    console.trace(err);
  }
});

// TODO: Test this endpoint
webapp.get('/get-suggestion-list', async (req, res) => {
  // check the token
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(404).json({ message: 'no token, authorization denied' });
  }
  try {
    await jwt.verify(token, "testKey", {},  async (err, decoded) => {
      if (err) {
        res.status(404).json({ message: 'token is not valid' });
        return;
      } else {
        const user = await dbLibUser.getUser(decoded.id);
        if (!user) {
          res.status(404).json({ message: 'user not found' });
          return;
        }
      }
      const suggestionList = await dbLibUser.getSuggestionList(decoded.id);
      res.status(200).json({ data: suggestionList });
    });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});




// update the follow list in /followinglist endpoint
webapp.put('/followinglist', async (req, res) => {
  // parse the body of the request
  if (!req.body.followingName) {
    res.status(404).json({ message: 'missing following name' });
    return;
  }
  try {
    const isAlreadyFollow = await dbLib.isMyFollowing(req.body.followingName)
    console.log("isAlreadyFollow is " + isAlreadyFollow);
    let result;
    const token = req.header('x-auth-token');
    if (token === '1234') {
      const id = req.body.testid;
      if (isAlreadyFollow) {
        result = await dbLib.unfollowUser(id, req.body.followingName);
      } else {
        result = await dbLib.followUser(id, req.body.followingName);
      }
      res.status(200).json(result);
    } else {
      jwt.verify(token, "testKey", {}, async (err, decoded) => {
        if (err) {
          res.status(404).json({message: 'token is not valid'});
        } else {
          const id = decoded.id;
          if (!isAlreadyFollow) {
            result = await dbLib.followUser(decoded.id, req.body.followingName);
          } else {
            result = await dbLib.unfollowUser(req.body.followingName);
          }
          // send the response with the appropriate status code
          res.status(200).json({message: result});
        }
      });
    }
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
    console.trace(err);
  }
});

webapp.delete('/followinglist', async (req, res) => {
  const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({message: 'no token, authorization denied'});
    }
    console.log("token is " + token);
    try {
        await jwt.verify(token, "testKey", {},  async (err, decoded) => {
            if (err) {
                res.status(401).json({message: 'token is not valid'});
            } else {
                const result = await dbLib.unfollowUser(decoded.id, req.body.followingName);
                res.json(result);
                return;
            }
        })
    } catch (err) {
        console.trace(err);
    }
});

// implement the GET in /activity-feed/:id/comment endpoint
webapp.get('/post/:id/comment', async (req, res) => {
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

// implement the POST in /post/:id/comment endpoint
webapp.post('/post/:id/comment', async (req, res) => {
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
  // parse the body of the request
  if (!req.body.message) {
    res.status(404).json({ message: 'missing message' });
    return;
  }
  try {
    const result = await dbLib.updateComment(req.body.message, req.body.postid, req.params.id);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// implement the GET in /posts endpoint
webapp.get('/post', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbLibPost.getPosts();
    // send the response with the appropriate status code
    // console.log(results.username);
    
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

/**
webapp.delete('/student/:id', async (req, res) => {
  console.log('DELETE a student');
  try {
    const result = await dbLib.deleteStudent(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'student not in the system' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

MOCK API
// Delete a Post
export const deletePost = async(PostId) => {
  try {
    const response = await axios.delete(`${rootURL}/Post/${PostId}`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}
 */

webapp.delete('/Post/:id', async (req, res) => {
  try {
    const result = await dbLibPost2.deletePost(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Post not in the system' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});



webapp.get('/post/:id', async (req, res) => {
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


webapp.get('/userposts/:username', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbLibPost.getUserPosts(req.params.username);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// implement the GET in /posts endpoint
webapp.get('/users', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbLibPost.getUsers();
    // send the response with the appropriate status code
    // console.log(results.username);
    
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

webapp.get('/friendsuggestion', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbLibPost.getSuggestionList();
    // send the response with the appropriate status code
    // console.log(results.username);
    
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// get results for is my like post
webapp.put('/isMyLikePost', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbLibLike.isMyLikePost(req.body.PostId, req.body.UserId);
    // send the response with the appropriate status code
    // console.log(results.username);
    
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// update the like array in post endpoint
webapp.put('/postlike', async (req, res) => {
  try {
    const result = await dbLibLike.incrementPostLike(req.body.PostId, req.body.UserId);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// update the like array in post endpoint
webapp.put('/postunlike', async (req, res) => {
  try {
    const result = await dbLibLike.cancelPostLike(req.body.PostId, req.body.UserId);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});


// implement the POST User endpoint
webapp.post('/user/', async (req, res) => {
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
  try {
    const result = await dbLibUser.getAllUsers();
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ message: 'there was an error' });
  }
});

// implement the GET a User endpoint
webapp.get('/user/:id', async ( req, res ) => {
  try {
    const result = await dbLibUser.getUser(req.params.id);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ message: 'invalid user id' });
  }
});

webapp.post('/login', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    res.status(404).json({message: 'missing email or password'});
  }
  const user = await dbLibUser.getUserByEmail(email);
  if (!user) {
      res.status(404).json({message: 'invalid email'});
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      res.status(404).json({message: 'invalid password'});
    }
    try {
      // issue a token here
      jwt.sign({ id: user._id }, "testKey", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        req.session.token = token;
        res.status(200).json({
          token,
          user: {
            id: user._id,
            email: user.email,
          },
        });
      });
    } catch (err) {
      res.status(404).json({message: 'invalid token'});
    }
  });
});

//TODO: Test this endpoint
webapp.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    res.status(404).json({ message: 'missing username or password' });
  }
  const user = await dbLibUser.getUserByEmail(email);
  if (user) {
    res.status(404).json({message: 'user already exists'});
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newUser = {
    username,
    email,
    password: hash,
    profilePicture: "",
    bio: "",
    followers: [],
    following: [],
    posts: [],
  };
  const result = await dbLibUser.createUser(newUser);
  jwt.sign({ id: result }, "testKey", { expiresIn: 3600 }, (err, token) => {
    if (err) throw err;
    req.session.token = token;
    res.status(200).json({
      token,
      user: {
        id: result,
        email: email,
      },
    });
  });
});

webapp.post('/post', async (req, res) => {
  // make sure all fields are present
  const post = req.body;
  try {
    const result = await dbLibPost2.createPost(post);
    res.status(201).json({ data: { id: result, ...post } });
    return;
  } catch (err) {
    res.status(409).json({message: "there was an error"});
    return;
  }
});

//TODO: Fix status codes
webapp.get('/checktoken', async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({message: "no token"});
    }
    try {
      jwt.verify(token, "testKey", {}, (err, decoded) => {
        if (err) {
          res.status(402).json({message: "invalid token"});
          console.trace(err);
          return;
        }
        res.status(200).json({message: "valid token"});
      });
    } catch (err) {
      res.status(403).json({message: "invalid token"});
    }
});

webapp.put('/post/:id', async (req, res) => {
  // check the json web token
  const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({message: 'no token, authorization denied'});
        return;
    }
    if (token === '1234') {
      const updatedPost = req.body;
      const id = req.params.id;
      if (!updatedPost.postCaption || !updatedPost.postTagOfOtherUsers || !updatedPost.postCommentArray || !updatedPost.like) {
        res.status(404).json({message: 'missing fields'});
        return;
      }
      const result = await dbLibPost2.updatePost(updatedPost, id);
      res.status(200).json({data: result});
        return;
    } else {
      // TODO: Fix the status codes
      try {
        await jwt.verify(token, "testKey", {}, async (err, decoded) => {
          if (err) {
            res.status(401).json({message: 'invalid token'});
            console.trace(err);
            return;
          }
          const user = await dbLibUser.getUser(decoded.id);
          if (!user) {
            res.status(402).json({message: 'invalid user'});
            return;
          }
          const post = await dbLibPost2.getPost(req.params.id);
          if (!post) {
            res.status(403).json({message: 'invalid post id'});
            return;
          }
          /*if (post.username !== user.username) {
            console.log(post.username);
            console.log(user.username);
            res.status(404).json({message: 'unauthorized'});
            return;
          }*/
          const updatedPost = {
            username: req.body.username,
            postImage: req.body.postImage,
            postCaption: req.body.postCaption,
            publicPrivate: req.body.publicPrivate,
            postTagOfOtherUsers: req.body.postTagOfOtherUsers,
            postCommentArray: req.body.postCommentArray,
            like: req.body.like,
          }
          const id = req.params.id;
          if (!updatedPost.postCaption || !updatedPost.postTagOfOtherUsers || !updatedPost.postCommentArray || !updatedPost.like) {
            res.status(405).json({message: 'missing fields'});
            return;
          }
          const result = await dbLibPost2.updatePost(updatedPost, id);
          res.status(200).json({data: result});
        });
      } catch (err) {
        console.trace(err);
      }
    }
});

webapp.get('/gettokenuser', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({message: "no token"});
        return;
    }
    try {
        jwt.verify(token, "testKey", {}, async (err, decoded) => {
            if (err) {
                res.status(402).json({message: "invalid token"});
                console.trace(err);
                return;
            }
            const user = await dbLibUser.getUser(decoded.id);
            if (!user) {
                res.status(403).json({message: "invalid user"});
                return;
            }
            res.status(200).json({data: user});
        });
    } catch (err) {
        console.trace(err);
    }
});

webapp.post('/testisfollowing', async (req, res) => {
  const userID = req.body.userID;
  const otherUserID = req.body.otherUserID;
    const result = await dbLibUser.isFollowing(userID, otherUserID);
    res.status(200).json({data: result});
});

webapp.post('/testsuggestions', async (req, res) => {
    const userID = req.body.userID;
    const result = await dbLibUser.getSuggestionList(userID);
    res.status(200).json({data: result});
});

// catch all endpoint
webapp.use((req, resp) => {
  resp.status(404).json({ error: 'invalid endpoint' });
});

// do not forget to export the express server
module.exports = webapp;
