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


// import Userpic from './components/test'
import Gallery from './components/gallery.component'
import Sidebar from './components/sidebar.component'
import Createpost from './components/createpost.component'
import { Router } from "react-router";
import { createMemoryHistory } from 'history';

// test('renders follow span', ()=>{
//     const{getByText} =  render(
//         <FriendSuggestion />
//     );
//     const linkElement = getByText("Follow");
//     expect(linkElement).toBeInTheDocument();
//   })

test("Create button should be in the sidebar",() =>{
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <Sidebar />,
        </Router>,

    );
    const labelNode = component.getByText("Create");
    expect(labelNode).toBeInTheDocument();

});

test("Create button should be in the sidebar",() =>{
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <Sidebar />,
        </Router>,

    );
    const labelNode = component.getByText("Home");
    expect(labelNode).toBeInTheDocument();

});

test("Create button should be in the sidebar",() =>{
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <Sidebar />,
        </Router>,

    );
    const labelNode = component.getByText("Suggestions for you");
    expect(labelNode).toBeInTheDocument();

});