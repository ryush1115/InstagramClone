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
import ActivityFeed from './components/activityfeed.component'
import FriendSuggestion from './components/FriendSuggestion.component'
import FriendSuggestionComponent from './components/FriendSuggestionComponent';
import DragDrop from './components/dragdrop.component';

// import Userpic from './components/test'
import Gallery from './components/gallery.component'
import Sidebar from './components/sidebar.component'
import Createpost from './components/createpost.component'
import { Router } from "react-router";
import { createMemoryHistory } from 'history';







//testing create post
test('renders text', ()=>{
    const{getByText} =  render(
        <DragDrop />
    );
    const test = getByText("Create Post");
    expect(test).toBeInTheDocument();
   })
   
   //testing title
   test('renders text', ()=>{
       const{getByText} =  render(
           <DragDrop />
       );
       const test = getByText("Create a Post Here!!");
       expect(test).toBeInTheDocument();
      })


test('clicking the button create post still in create post Page because you didnt input any thing', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <DragDrop />,
        // </Router>,

    );
    const span2 = screen.getByText("Create Post");
    // expect(span2).toHaveClass("create-hover");
    fireEvent.click(span2);
    expect(screen.getByText("Create a new post!")).toBeInTheDocument();
    // const button = screen.getByRole('button', { name: /See All/i });
});

test('clicking the  ', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <DragDrop />,
        // </Router>,

    );
    const span2 = screen.getByText("Create a Post Here!!");
    // expect(span2).toHaveClass("create-hover");
    fireEvent.click(span2);
    expect(screen.getByText("Create a new post!")).toBeInTheDocument();
    // const button = screen.getByRole('button', { name: /See All/i });
});

