/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByLabelText, getByTestId, within } from '@testing-library/dom'
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

test("sign up form should be in the component", () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <SignUp />,
        </Router>,

    );
    const labelNode = component.getByText("Email");
    expect(labelNode).toBeInTheDocument();
});

test("sign up form should be in the component", () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <SignUp />,
        </Router>,

    );
    const labelNode = component.getByText("Password");
    expect(labelNode).toBeInTheDocument();
});

test("sign up form should be in the component", () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <SignUp />,
        </Router>,

    );
    const labelNode = component.getByText("Re-enter Password");
    expect(labelNode).toBeInTheDocument();
});

// test('renders sign in?', ()=>{
//     const history = createMemoryHistory();
//     const component = render(
//         <Router location={history.location} navigator={history}>
//             <SignUp />,
//         </Router>,

//     );
//     const test = screen.getByTestId('alreadyregistered');
//     expect(test).toBeInTheDocument();
//   })

test("Welcome text should be in the component", () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <SignUp />,
        </Router>,

    );
    const labelNode = component.getByText("Welcome to Instaphoto");
    expect(labelNode).toBeInTheDocument();
});

// test("testing1 should be in the component", () => {
//     const history = createMemoryHistory();
//     const component = render(
//         <Router location={history.location} navigator={history}>
//             <SignUp />,
//         </Router>,

//     );
//     const labelNode = component.getByTestId("");
//     expect(labelNode).toBeInTheDocument();
// });
test("check if sign in link present", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router location={history.location} navigator={history}>
            <SignUp />,
        </Router>,

    );
    const test = getByText(/sign in?/);
    expect(test).toBeInTheDocument();

});

test('click on sign in? will direct to sign in page', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <SignUp />,
        // </Router>,

    );
    const span2 = screen.getByRole("button", {name: "Finish"} )
    // expect(span2).toHaveClass("create-hover");
    fireEvent.click(span2);
    expect(screen.getByText("Welcome to Instaphoto")).toBeInTheDocument();
});

test("username input should accept text", () => {
    const history = createMemoryHistory();
    const { getByLabelText } = render(
        <Router location={history.location} navigator={history}>
            <SignUp />,
        </Router>,);
    // const emailInputNode = getByLabelText("Email");
    const UsernameInputNode = screen.getByPlaceholderText("Username");
    expect(UsernameInputNode.value).toMatch("")
    fireEvent.change(UsernameInputNode, { target: { value: 'testing' } })
    expect(UsernameInputNode.value).toMatch("testing");
});

test("Email input should accept text", () => {
    const history = createMemoryHistory();
    const { getByLabelText } = render(
        <Router location={history.location} navigator={history}>
            <SignUp />,
        </Router>,);
    // const emailInputNode = getByLabelText("Email");
    const UsernameInputNode = screen.getByPlaceholderText("Email");
    expect(UsernameInputNode.value).toMatch("")
    fireEvent.change(UsernameInputNode, { target: { value: 'testing' } })
    expect(UsernameInputNode.value).toMatch("testing");
});

test('click on sign in? will direct to sign in page', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <SignUp />,
        // </Router>,

    );
    const span2 = screen.getByRole("button");
    // expect(span2).toHaveClass("create-hover");
    fireEvent.click(span2);
    expect(screen.getByText("Welcome to Instaphoto")).toBeInTheDocument();
    // const button = screen.getByRole('button', { name: /See All/i });
});