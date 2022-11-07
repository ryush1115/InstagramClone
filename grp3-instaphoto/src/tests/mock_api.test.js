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
createPost, createUser} from '.././api/mock_api';

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
  const newPost = { username: "newUsername", postImage: "newPostImage", postComment: "newPostComment", publicPrivate: false, postTagOfOtherUsers: null, id: 10 };
  // send POST request to create new User
  const newStoredPost = await createPost(newPost);
  // console.log(newStoredPost)
  expect(newStoredPost).toBeDefined()
})

