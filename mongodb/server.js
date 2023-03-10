// Express app file

// (1) import express
// backend ==> require
const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');
const crypto = require('crypto');
const sharp = require('sharp');
const rootURL = 'http://localhost:8000'

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');



// to lock a user out after 3 unsuccessful attempts we'll need to keep track of:
// their attempt count
// a time stamp of their first attempt
// we should store a sign-in-attempts object
// it should timestamp the last unsuccessful attempt for a user, and increment the value after each attempt
// on the login page, we should check if their attempt number is 2
// if it is, and we're within a certain time thresh hold since their last attempt, we lock them out

// we'll need to update:
// login page
// mock api function for logging in


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
  }),
);

// (4) enable cors
webapp.use(cors());

// (6) configure express to parse bodies (better to use JSON, easier to work with.)
webapp.use(express.json());

// (7) import the db interactions module
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbLib = require('./dbFollow&Comments');
const dbLibPost = require('./dbPost');
const dbLibLike = require('./dbLike');
const dbLibPost2 = require('./dbCreatePost');

// import the db interactions modules
const dbLibUser = require('./dbUser');
const {failedSignIn, resetFailedSignIns, getLoginAttempts} = require("./dbUser");

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
    res.status(401).json({ message: 'no token, authorization denied' });
  }
  if (token === '1234') {
    const followArr = await dbLib.getMyFollowing();
    res.status(200).json({ data: followArr });
  }
  try {
    await jwt.verify(token, 'testKey', {}, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'token is not valid' });
      } else {
        const result = await dbLib.getMyFollowing(decoded.id);
        res.json(result);
      }
    });
  } catch (err) {
    console.trace(err);
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
    let result;
    const token = req.header('x-auth-token');
    if (token === '1234') {
      const id = req.body.testid;
      const isAlreadyFollow = await dbLib.isMyFollowing(id, req.body.followingName);
      if (isAlreadyFollow) {
        result = await dbLib.unfollowUser(id, req.body.followingName);
      } else {
        result = await dbLib.followUser(id, req.body.followingName);
      }
      res.status(200).json(result);
    } else {
      jwt.verify(token, 'testKey', {}, async (err, decoded) => {
        if (err) {
          res.status(401).json({ message: 'token is not valid' });
        } else {
          const { id } = decoded;
          const isAlreadyFollow = await dbLib.isMyFollowing(decoded.id, req.body.followingName);
          if (!isAlreadyFollow) {
            result = await dbLib.followUser(decoded.id, req.body.followingName);
          } else {
            result = await dbLib.unfollowUser(decoded.id, req.body.followingName);
          }
          // send the response with the appropriate status code
          res.status(200).json({ message: result });
        }
      });
    }
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
    console.trace(err);
  }
});

webapp.put('/isMyself', async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({ message: 'no token, authorization denied' });
  }
 
  try {
    await jwt.verify(token, 'testKey', {}, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'token is not valid' });
      } else {
        const result = (decoded.id === req.body.user._id);
        console.log(`${result}`);
        console.log(`${decoded.id}`);
        console.log(`${req.body.user._id}`);
        res.json(result);
      }
    });
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
webapp.put('/comments/:commentid/:postid/:message', async (req, res) => {
  // parse the body of the request
  // if (!req.body.message) {
  // res.status(404).json({ message: 'missing message' });
  // return;
  // }
  console.log('req.params.message', req.params.message);
  console.log('req.params.postid', req.params.postid);
  console.log('req.params.commentid', req.params.commentid);
  try {
    const result = await dbLib.updateComment(req.params.message, req.params.postid, req.params.commentid);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// implement the GET in /posts endpoint
webapp.get('/post/:page', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbLibPost.getPosts(req.params.page);
    // send the response with the appropriate status code
    // console.log(results.username);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// implement the GET in /posts endpoint
webapp.get('/postAll/:page', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbLibPost.getPostsAll(req.params.page);
    // send the response with the appropriate status code
    // console.log(results.username);

    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

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

// Make Post Private
// webapp.put('/post/:id', async (req, res) => {
//   try {
//     const result = await dbLibPost.makePostPrivate(req.params.id);
//     // send the response with the appropriate status code
//     res.status(200).json({ message: result });
//   } catch (err) {
//     res.status(404).json({ message: 'there was an error' });
//   }
// });

// // Make Post Public
// webapp.put('/post/:id', async (req, res) => {
//   try {
//     const result = await dbLibPost.makePostPublic(req.params.id);
//     // send the response with the appropriate status code
//     res.status(200).json({ message: result });
//   } catch (err) {
//     res.status(404).json({ message: 'there was an error' });
//   }
// });

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
  const token = req.header('x-auth-token');
  if (token === '1234'){
    try {
      const result = await dbLibLike.incrementPostLike(req.body.PostId, req.body.UserId);
      res.status(200).json({ message: result });
    } catch (err) {
      console.trace(err);
      res.status(404).json({ message: 'there was error' });
    }
  } else {
  try {
    jwt.verify(token, 'testKey', {}, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' });
        return;
      }
      if (!!req.body.UserId) {
        try {
          const result = await dbLibLike.incrementPostLike(req.body.PostId, req.body.UserId);
          res.status(200).json({ message: result });
        } catch (err) {
          console.trace(err);
          res.status(404).json({ message: 'there was error' });
        }
      } else {
        try {
            const result = await dbLibLike.incrementPostLike(req.body.PostId, decoded.id);
            res.status(200).json({ message: result });
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
      }
    });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }}
});

// update the like array in post endpoint
webapp.put('/postunlike', async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({ message: 'no token' });
    return;
  }
  else if (token === '1234'){
    try {
      const result = await dbLibLike.cancelPostLike(req.body.PostId, req.body.UserId);
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(404).json({ message: 'there was error' });
    }
  }
  else {
  try {
    await jwt.verify(token, 'testKey', {}, async (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'invalid token' });
            return;
        }
        if (!!req.body.UserId) {
            try {
              const result = await dbLibLike.cancelPostLike(req.body.PostId, req.body.UserId);
              res.status(200).json({ message: result });
            } catch (err) {
              res.status(404).json({ message: 'there was error' });
            }
        } else {
          const userID = decoded.id;
            try {
                const result = await dbLibLike.cancelPostLike(req.body.PostId, userID);
                res.status(200).json({ message: result });
            } catch (err) {
              res.status(404).json({ message: 'there was error' });
            }
        }
    });
  } catch (err) {
    res.status(401).json({ message: 'invalid token' });
  }}
});

// implement the POST User endpoint
webapp.post('/user/', async (req, res) => {
  // parse the body of the request to make sure all fields are present
  // eslint-disable-next-line max-len
  if (!req.body.email || !req.body.username || !req.body.password || !req.body.profilePicture || !req.body.follow || !req.body.id) {
    res.status(404).json({ message: 'missing email, username, password, profilePicture, follow or id' });
    return;
  }
  try {
    const loginAttemptsObject = {
      lastAttempt: Date(),
      currentNumber: 0
    };
    // create new user
    const newUser = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      profilePicture: req.body.profilePicture,
      follow: req.body.follow,
      loginAttemptsObject: loginAttemptsObject,
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
  if (!req.body.password) {
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
webapp.get('/allusers', async (req, res) => {
  try {
    const result = await dbLibUser.getAllUsers();
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ message: 'there was an error' });
  }
});

// implement the GET a User endpoint
webapp.get('/user/:id', async (req, res) => {
  try {
    const result = await dbLibUser.getUser(req.params.id);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ message: 'invalid user id' });
  }
});

webapp.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({ message: 'missing email or password' });
  }
  const user = await dbLibUser.getUserByEmail(email);
  if (!user) {
    res.status(401).json({ message: 'invalid email' });
  }
  bcrypt.compare(password, user.password, async (err, matched) => {
    if (err) {
      // call something that increments the user's failed sign-ins
      console.trace(err);
      const number = await failedSignIn(email);
      res.status(403).json({ message: 'invalid password', number: number });
      return;
    }
    if (matched) {
      const lastAttemptObject = await getLoginAttempts(email);
      if (lastAttemptObject.currentNumber < 3 || lastAttemptObject.lastAttempt < Date.now() - 60000) { // 1 minute
        try {
          // issue a token here
          await jwt.sign({id: user._id}, 'testKey', {expiresIn: 3600}, async (err, token) => {
            if (err) {
              res.status(401).json({message: 'token signing failed!'});
            }
            await resetFailedSignIns(email);
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
      } else {
        res.status(403).json({message: 'too many failed sign-ins, try again later.',
          number: lastAttemptObject.currentNumber});
      }
    } else {
      const number = await failedSignIn(email);
      res.status(403).json({ message: 'invalid password', number: number });
    }
  });
});

// I CAN CREATE TESTS FOR THESE EDGE CASES
// TODO: Test this endpoint
webapp.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    res.status(404).json({ message: 'missing username or password' });
  }
  const user = await dbLibUser.getUserByEmail(email);
  if (user) {
    res.status(404).json({ message: 'user already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const loginAttemptsObject = {
    lastAttempt: Date.now(),
    currentNumber: 0
  };
  const newUser = {
    username: username,
    email: email,
    password: hash,
    profilePicture: '',
    bio: '',
    followers: [],
    following: [],
    posts: [],
    loginAttemptsObject: loginAttemptsObject,
  };
  const result = await dbLibUser.createUser(newUser);
  jwt.sign({ id: result }, 'testKey', { expiresIn: 3600 }, (err, token) => {
    if (err) {
        res.status(401).json({ message: 'invalid token' });
    }
    req.session.token = token;
    res.status(200).json({
      token,
      user: {
        id: result,
        email,
      },
    });
  });
});

webapp.get('/User-Name/:username', async (req, res) => {
  const username = req.params.username;
    if (!username) {
        res.status(404).json({ message: 'missing username' });
    }
    const user = await dbLibUser.getUserByUsername(username);
    if (!user) {
        res.status(404).json({ message: 'invalid username' });
    } else {
      res.status(200).json({ data: user });
    }
});


webapp.post('/post', async (req, res) => {
  // make sure all fields are present
  const post = req.body;
  try {
    const result = await dbLibPost2.createPost(post);
    res.status(201).json({ data: { id: result, ...post } });
    return;
  } catch (err) {
    res.status(500).json({ message: 'there was an error' });
  }
});

// TODO: Fix status codes
webapp.get('/checktoken', async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({ message: 'no token' });
  }
  try {
    jwt.verify(token, 'testKey', {}, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' });
        console.trace(err);
        return;
      }
      res.status(200).json({ message: 'valid token' });
    });
  } catch (err) {
    res.status(401).json({ message: 'invalid token' });
  }
});

webapp.put('/post/:id', async (req, res) => {
  // check the json web token
  const token = req.header('x-auth-token');
    
  if (!token) {
    res.status(401).json({ message: 'no token, authorization denied' });
    return;
  }
  else if (token === '1234') {
    const updatedPost = req.body;
    const { id } = req.params;
    if (!updatedPost.postCaption || !updatedPost.postTagOfOtherUsers || !updatedPost.postCommentArray || !updatedPost.like) {
      res.status(404).json({ message: 'missing fields' });
      return;
    }
    const result = await dbLibPost2.updatePost(updatedPost, id);
    res.status(200).json({ data: result });
  } else {
    // TODO: Fix the status codes
    console.log("we are entering the non test case");
    
    try {
      await jwt.verify(token, 'testKey', {}, async (err, decoded) => {
        if (err) {
          res.status(401).json({ message: 'invalid token' });
          console.trace(err);
          return;
        }
        const user = await dbLibUser.getUser(decoded.id);
        if (!user) {
          res.status(404).json({ message: 'invalid user' });
          return;
        }
        const post = await dbLibPost2.getPost(req.params.id);
        if (!post) {
          res.status(404).json({ message: 'invalid post id' });
          return;
        }
        const updatedPost = {
          username: req.body.username,
          postImage: req.body.postImage,
          postCaption: req.body.postCaption,
          publicPrivate: req.body.publicPrivate,
          postTagOfOtherUsers: req.body.postTagOfOtherUsers,
          postCommentArray: req.body.postCommentArray,
          like: req.body.like,
        };
        const { id } = req.params;
        if (!updatedPost.postCaption || !updatedPost.postTagOfOtherUsers || !updatedPost.postCommentArray || !updatedPost.like) {
          res.status(405).json({ message: 'missing fields' });
          return;
        }
        const result = await dbLibPost2.updatePost(updatedPost, id);
        res.status(200).json({ data: result });
      });
    } catch (err) {
      console.trace(err);
    }
  }
});

webapp.get('/gettokenuser', async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({ message: 'no token' });
    return;
  }
  try {
    jwt.verify(token, 'testKey', {}, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' });
        console.trace(err);
        return;
      }
      const user = await dbLibUser.getUser(decoded.id);
      if (!user) {
        res.status(404).json({ message: 'invalid user' });
        return;
      }
      res.status(200).json({ data: user });
    });
  } catch (err) {
    console.trace(err);
  }
});


webapp.post('/testisfollowing', async (req, res) => {
  const { userID } = req.body;
  const { otherUserID } = req.body;
  const result = await dbLibUser.isFollowing(userID, otherUserID);
  res.status(200).json({ data: result });
});


webapp.post('/testsuggestions', async (req, res) => {
  const { userID } = req.body;
  const result = await dbLibUser.getSuggestionList(userID);
  res.status(200).json({ data: result });
});

// change post between private and public
webapp.put('/Post/:PostId/:status', async (req, res) => {
  try {
    // get the data from the db
    const results = await dbLibPost.changePostPrivateOrPublic(req.params.PostId, req.params.status);
    // send the response with the appropriate status code
    // console.log(results.username);
    
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});


//const upload = multer({ storage: storage })
const upload = multer({ dest: 'uploads/' })
const { uploadFile, getFileStream } = require('./s3')


webapp.get('/postsfile/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)

  //const url = `http://localhost:8000/postsfile/${key}`
  
})


// Post image file
webapp.post('/postsfile',upload.single('image'),  async (req, res) => {

  const file = req.file;
  console.log(file)
  const result = await uploadFile(file)
  console.log(result)
  
  const caption = req.body.caption

  res.send({imagePath: `${rootURL}/postsfile/${result.Key}`})
  //res.status(200).json({ data: `http://localhost:8000/postsfile/${result.Key}`});
});

// catch all endpoint
webapp.use((req, resp) => {
  resp.status(404).json({ error: 'invalid endpoint' });
});

// do not forget to export the express server
module.exports = webapp;
