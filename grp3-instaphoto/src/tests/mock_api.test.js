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
import {getUser, getPosts, getPost, getPassword,
  getCommentMessage, getMyFollowings, getSuggestionList,
createPost, createUser, getCommentsArray, isMyFollowing, 
cancelFollowing, following, deletePost, cancelPostLike, isMyLikePost, createCommentInPost, hasCommonFollowings} from '.././api/mock_api';

test('#getUser() using async/await', async () => {
  const data = await getUser(1)
  expect(data).toBeDefined()
})
  
test('#getPosts() using async/await', async () => {
  const data = await getPosts()
  expect(data).toBeDefined()
})

test('#getPost() using async/await', async () => {
  const data = await getPost(1)
  expect(data).toBeDefined()
})

test('#getCommentMessage() using async/await', async () => {
  const data = await getCommentMessage(1)
  expect(data).toBeDefined()
})

test('#getMyFollowings() using async/await', async () => {
  const data = await getMyFollowings()
  expect(data).toBeDefined()
})

test('#getSuggestionList() using async/await', async () => {
  const data = await getSuggestionList()
  expect(data).toBeDefined()
})

test('#createNewUser() using async/await', async () => {
  // create new User variable
  const newUser = { username: "newUsername", email: "newEmail@com", password: "newPassword", profilePicture: "", follow: [] };
  // send POST request to create new User
  const newStoredUser = await createUser(newUser);
  expect(newStoredUser).toBeDefined()
})

test('#createNewUser() using async/await', async () => {
  const newPost = { username: "newUsername", postImage: "newPostImage", postComment: "newPostComment", publicPrivate: false, postTagOfOtherUsers: null, id: 10, like :[] };
  // send POST request to create new User
  const newStoredPost = await createPost(newPost);
  // console.log(newStoredPost)
  expect(newStoredPost).toBeDefined()
})

// test Get Password
test("Should return null when pw not found", async()=> {
  const result = await getPassword(-99);
  expect(result).toBeUndefined();
})

// test Get Password
test("Should return null when pw not found", async()=> {
  const result = await createCommentInPost(-99);
  expect(result).toBeUndefined();
})

// test Get CommentsArray
test("Should return null when comments array not found", async()=> {
  const result = await getCommentsArray(-99);
  expect(result).toBeUndefined();
})

// test Get comments message
test("Should return null when comments message not found", async()=> {
  const result = await getCommentMessage(-99);
  expect(result).toBeUndefined();
})

// test has common followings 
test("Should return null when get my followings not found", async()=> {
  const result = await hasCommonFollowings(-99);
  expect(result).toBeUndefined();
})
// test Get my followings 
test("Should return null when get my followings not found", async()=> {
  const result = await getMyFollowings(-99);
  expect(result).toBeUndefined();
})

// test following
test("Should return null when followings not found", async()=> {
  const result = await following(-99);
  expect(result).toBeUndefined();
})

// test  cancel following
test("Should return null when cancel following not found", async()=> {
  const result = await cancelFollowing(-99);
  expect(result).toBeUndefined();
})

// test is my following
test("Should return null when is my following not found", async()=> {
  const result = await isMyFollowing(-99);
  expect(result).toBe(false);
})

// test is my following
test("Should return null when getSuggestoinList not found", async()=> {
  const result = await getSuggestionList(-99);
  expect(result).toBe(["test1", "test2", "test3"]);
})

// test delete post
test("Should return null when delete post id not found", async()=> {
  const result = await deletePost(-99);
  expect(result).toBeUndefined();
})

// test cancel Post Like
test("Should return null when cancel post like not found", async()=> {
  const result = await cancelPostLike(-99);
  expect(result).toBeUndefined();
})

// test cancel Post Like
test("Should return null when isMyLikePost not found", async()=> {
  const result = await isMyLikePost(-99);
  expect(result).toBeUndefined();
})


