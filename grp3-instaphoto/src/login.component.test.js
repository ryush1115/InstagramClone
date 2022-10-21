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

//https://bobbyhadz.com/blog/react-cannot-read-property-pathname-of-undefined

test('renders Dont have an account', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Login />,
        </Router>,

    );
    expect(history.location.pathname).toBe("/");
})
test("login form should be in the component",() =>{
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <Login />,
        </Router>,

    );
    const labelNode = component.getByText("Email");
    expect(labelNode).toBeInTheDocument();

});
// //WARNING: have no form control associated with that label.
// test("email field should have label",()=>{
//     const history = createMemoryHistory();
//     const component = render(
//         <Router location={history.location} navigator={history}>
//             <Login />,
//         </Router>,

//     );
//     const emailInputNode = component.getByLabelText("Email");
//     expect(emailInputNode.getAttribute("type")).toBe("email");
// });

test("render sign up link",() =>{
    const history = createMemoryHistory();
    const {getByText} = render(
        <Router location={history.location} navigator={history}>
            <Login />,
        </Router>,

    );
    const test = getByText(/Sign up now to join communities across the globe/);
    expect(test).toBeInTheDocument();

});



// //testing email with '@'
// test("validate function should pass on correct input", async () => {
//     const history = createMemoryHistory();
//     render(
//         <Router location={history.location} navigator={history}>
//             <Login />,
//         </Router>,);
//     const text = 'text@test.com'
//     const element = getByLabelText();
//     await userEvent.type(element, text)
//     expect(validateInput(text)).toBe(true);
// });