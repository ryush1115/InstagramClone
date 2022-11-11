/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByLabelText, within } from '@testing-library/dom'
// import FormTest from "./Form-Test"
// import renderer from 'react-test-renderer';
import React from 'react';



import App from './App';
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Userprofile from './components/userprofile.component'
import PostRow from './components/PostRow'
import FriendSuggestion from './components/FriendSuggestion.component'


// import Userpic from './components/test'
import Gallery from './components/gallery.component'
import Sidebar from './components/sidebar.component'
//import Createpost from './components/createpost.component'
import { Router } from "react-router";
import { createMemoryHistory } from 'history';

test("test the single row post",async () =>{
    const post = {
        "username": "Augusta_Breitenberg76",
        "postImage": "http://loremflickr.com/640/480/?lock=1",
        "postComment": "Cute cat!!!!",
        "publicPrivate": false,
        "postTagOfOtherUsers": [],
        "id": "1",
        "like": []
        };
    
    render(<PostRow post = {post} key = {0}/>);

    

    // const likeButton = screen.queryByTestId('button-0');
    // expect(likeButton).toBeInTheDocument();

    // const likeButton = screen.getAllByText('Like')[0];
    // expect(likeButton).toBeInTheDocument();

    const likeButton = screen.getByText('Like');
    expect(likeButton).toBeInTheDocument();
    
    const likeCounter = screen.getByTestId('likeCounter');
    expect(likeCounter).toBeInTheDocument();
    
    let orgCounter = + likeCounter.innerHTML;

    await userEvent.click(likeButton);
    expect(likeButton).toHaveTextContent('unLike');
    orgCounter++;
    expect(likeCounter).toHaveTextContent(orgCounter);

    await userEvent.click(likeButton);
    expect(likeButton).toHaveTextContent('Like');
    orgCounter--;
    expect(likeCounter).toHaveTextContent(orgCounter);
   

});