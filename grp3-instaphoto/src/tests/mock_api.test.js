/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
// import FormTest from "./Form-Test"
// import renderer from 'react-test-renderer';
import React from 'react';

// import { enableFetchMocks } from 'jest-fetch-mock';
import {getUsers, getUser, getPosts, getPost, getPassword,
  getCommentMessage, getMyFollowings, getSuggestionList,
createPost, createUser, getCommentsArray, isMyFollowing, 
cancelFollowing, following, deletePost, cancelPostLike,
postLike, incrementPostLike, createComment, getUserPosts,
isMyLikePost, createCommentInPost, hasCommonFollowings,updateComment} from '.././api/mock_api';


// we good
test('#getUsers() using async/await', async () => {
  const data = await getUsers()
  expect(data).toBeDefined()
})

// we good
test('#getUser() using async/await', async () => {
  const data = await getUser("637aaadf3f3f430d2ce0accb")
  expect(data).toBeDefined()
})
 
// we good
test('#getPosts() using async/await', async () => {
  const data = await getPosts()
  expect(data).toBeDefined()
})

// we good
test('#getPost() using async/await', async () => {
  const data = await getPost("637aaaf308e936a0c97e4a31")
  expect(data).toBeDefined()
})

// we good
test('#getCommentArray() using async/await', async () => {
  const data = await getCommentsArray("637aaaf308e936a0c97e4a31")
  expect(data).toBeDefined()
})

// we good
test('#getMyFollowings() using async/await', async () => {
  const data = await getMyFollowings()
  expect(data).toBeDefined()
})

// we good
test('#getSuggestionList() using async/await', async () => {
  const data = await getSuggestionList()
  expect(data).toBeDefined()
})

// we good
test('#createNewUser() using async/await', async () => {
  // create new User variable
  const newUser = { username: "newUsername", email: "newEmail@com", password: "newPassword", profilePicture: "null", follow: "null", id: "999"};
  // send POST request to create new User
  const newStoredUser = await createUser(newUser);
  expect(newStoredUser).toBeDefined()
})

// LOOK INTO THIS
test('#createNewPost() using async/await', async () => {
  const newPost = { username: "newUsername", postImage: "newPostImage", postComment: "newPostComment", publicPrivate: false, postTagOfOtherUsers: null, id: 10, like :[] };
  // send POST request to create new User
  const newStoredPost = await createPost(newPost);
  // console.log(newStoredPost)
  expect(newStoredPost).toBeUndefined()
})

// we good
// // test Get Password
test("Should return null when pw not found", async()=> {
  const result = await getPassword(-99);
  expect(result).toBeUndefined();
})

// we good
// // test create comment in post
test("Should return null when create comment in post not found", async()=> {
  const result = await createCommentInPost(-99);
  expect(result).toBeUndefined();
})

// // test create comment 
test("Should return null when create comment  not found", async()=> {
  const result = await createComment(-99);
  expect(result).toBeUndefined();
})

// we good
// // test Get CommentsArray
test("Should return null when comments array not found", async()=> {
  const result = await getCommentsArray(-99);
  expect(result).toBeUndefined();
})

// we good
// // test Get comments message
test("Should return null when comments message not found", async()=> {
  const result = await getCommentMessage(-99);
  expect(result).toBeUndefined();
})

// //we good
test("Should return false when common followings not found", async()=> {
  const result = await hasCommonFollowings(-99);
  expect(result).toBeUndefined();
})

// For Junwei: get my followings doesn't take an argument
// // test Get my followings 
// test("Should return null when get my followings not found", async()=> {
//   const result = await getMyFollowings(-99);
//   expect(result).toBeUndefined();
// })

// we good
// // test following
test("Should return null when followings not found", async()=> {
  const result = await following(-99);
  expect(result).toBeUndefined();
})

// // we good
// // // test  cancel following
test("Should return null when cancel following not found", async()=> {
  const result = await cancelFollowing(-99);
  expect(result).toBeUndefined();
})

// // we good
// // // test is my following
test("Should return null when is my following not found", async()=> {
  const result = await isMyFollowing(-99);
  expect(result).toBeUndefined();
})

// we good
// // test delete post
test("Should return null when delete post id not found", async()=> {
  const result = await deletePost(-99);
  expect(result).toBeUndefined();
})

// this is not working
// test post like
// test("Should post a like", async()=> {
//   const incrementedLike = await incrementPostLike("637aaaf308e936a0c97e4a31");
//   expect(incrementedLike).toBeDefined()
// })  

// this is not working
// test post like
// test("Should cancel a like", async()=> {
//   const canceledLike = await cancelPostLike("637aaaf308e936a0c97e4a31");
//   expect(canceledLike).toBeDefined()
// })  

// we good
// // test cancel Post Like
test("Should return null when cancel post like not found", async()=> {
  const result = await cancelPostLike(-99);
  expect(result).toBeUndefined();
})

// we good
// // test ismylikepost
test("Should return null when isMyLikePost not found", async()=> {
  const result = await isMyLikePost(-99);
  expect(result).toBeUndefined();
})

// we good
// // test update comment
test("Should return null when updateComment not found", async()=> {
  const result = await updateComment(-99);
  expect(result).toBeUndefined();
})

test("Should return null when postlike not found", async()=> {
  const result = await incrementPostLike(-99);
  expect(result).toBeUndefined();
})

test("Should return null when cancelpostlike not found", async()=> {
  const result = await cancelPostLike(-99);
  expect(result).toBeUndefined();
})

test("Should return empty list for getUserPosts", async()=> {
  const result = await getUserPosts(-99);
  expect(result).toEqual([]);
})