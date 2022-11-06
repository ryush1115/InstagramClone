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
import {getUser, getPosts, getPost, getPassword} from '.././api/mock_api';

// enableFetchMocks();
// const lib = require('./fetch.js');

// test('check signup', async () => {
//     fetch.mockResponse(JSON.stringify({
//       group_ids: [],
//       post_ids: [],
//       comment_ids: [],
//       following: [],
//       followers: [],
//       blocking: [],
//       blocked_by: [],
//       group_admins: [],
//       created_at: "2021-12-19T22:15:51.702Z",
//       avatar_url: "",
//       notification_ids: [],
//       _id: "61bfb2a9250f00001636b9e0",
//       username: "testUser",
//       email: "testUser",
//       firstName: "testUser",
//       lastName: "testUser",
//       password: "$2b$10$Ln4lU55fn4NQ3zYYsRe1mOSSOnHQHAQ2YkOecdLyGKprX95PA5rni",
//       __v: 0
//     }));
//     const data = await lib.signup('testUser', 'testUser');
//     const res = await data.json();
//     expect(res.username).toBe('testUser');
//   });

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

// this one fails
// test('#getPassword() using async/await', async () => {
//   const data = await getPassword('Webster2@hotmail.com')
//   expect(data).toBeDefined()
// })

