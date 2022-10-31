import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();
const lib = require('./fetch.js');

test('check signup', async () => {
    fetch.mockResponse(JSON.stringify({
      group_ids: [],
      post_ids: [],
      comment_ids: [],
      following: [],
      followers: [],
      blocking: [],
      blocked_by: [],
      group_admins: [],
      created_at: "2021-12-19T22:15:51.702Z",
      avatar_url: "",
      notification_ids: [],
      _id: "61bfb2a9250f00001636b9e0",
      username: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      password: "$2b$10$Ln4lU55fn4NQ3zYYsRe1mOSSOnHQHAQ2YkOecdLyGKprX95PA5rni",
      __v: 0
    }));
    const data = await lib.signup('testUser', 'testUser');
    const res = await data.json();
    expect(res.username).toBe('testUser');
  });