import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';

import {getUsers} from './api/mock_api'

describe("getUsers", ()=> {

  let mock;
  const rootURL = 'http://localhost:8000'

  beforeAll(()=> {
    mock = new mockAdapter(axios);
  });

  afterEach( ()=> {
    mock.reset();
  });

  const mockresp = [
          {
            "email": "Webster2@hotmail.com",
            "username": "Elmer.Weissnat10",
            "password": "F2KC9R__6fRb8xI",
            "profilePicture": "http://loremflickr.com/640/480",
            "follow": [
              "Frederic.Strosin5"
            ],
            "id": "1"
          },
          {
            "email": "Claire37@gmail.com",
            "username": "Frederic.Strosin5",
            "password": "3Rvqa8WqKaorqkT",
            "profilePicture": "http://loremflickr.com/640/480",
            "follow": [],
            "id": "2"
          },
          {
            "email": "Ryley74@yahoo.com",
            "username": "Xavier.Vandervort",
            "password": "4c5YHKOXvh2appg",
            "profilePicture": "http://loremflickr.com/640/480",
            "follow": [],
            "id": "3"
          }
        ];

  describe("when API call successful", ()=> {
    it("should return users list", async() => {
      mock.onGet(`${rootURL}/User`).reply(200, mockresp);

      // when 
      const result = await getUsers();

      // then 
      //expect(mock.history.get[0].url).toEqual(`${rootURL}/User`);
      expect(result.data).toMatchObject(mockresp);

    });
  });
});


// import { AppBar } from '@material-ui/core';
// import { enableFetchMocks } from 'jest-fetch-mock';



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


  // describe('testing get_users()',()=>{
  //   it('fetch data and test response' async()=> {
  //     // expected fetch responses
  //     const mockresp = [
  //       {
  //         "email": "Webster2@hotmail.com",
  //         "username": "Elmer.Weissnat10",
  //         "password": "F2KC9R__6fRb8xI",
  //         "profilePicture": "http://loremflickr.com/640/480",
  //         "follow": [
  //           "Frederic.Strosin5"
  //         ],
  //         "id": "1"
  //       },
  //       {
  //         "email": "Claire37@gmail.com",
  //         "username": "Frederic.Strosin5",
  //         "password": "3Rvqa8WqKaorqkT",
  //         "profilePicture": "http://loremflickr.com/640/480",
  //         "follow": [],
  //         "id": "2"
  //       },
  //       {
  //         "email": "Ryley74@yahoo.com",
  //         "username": "Xavier.Vandervort",
  //         "password": "4c5YHKOXvh2appg",
  //         "profilePicture": "http://loremflickr.com/640/480",
  //         "follow": [],
  //         "id": "3"
  //       }
  //     ];
  //     fetch.mockResponse(JSON.stringify(mockresp));
  //     const res = await mock_api.getUsers(),

  //     expet(res).toMatchObject({email:"Webster2@hotmail.com"});

  //   })

  // })




