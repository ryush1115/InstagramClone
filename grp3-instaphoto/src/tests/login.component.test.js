/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
// import FormTest from "./Form-Test"
// import renderer from 'react-test-renderer';
import React from 'react';


import Login from '.././components/login.component'

// import Userpic from './components/test'
import { Router } from "react-router";
import { createMemoryHistory } from 'history';

//REFERENCE
//https://bobbyhadz.com/blog/react-cannot-read-property-pathname-of-undefined
//https://www.youtube.com/watch?v=hPOS6IRKJm0&t=901s

test('renders Dont have an account', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Login />,
        </Router>,

    );
    expect(history.location.pathname).toBe("/");
})
test("login form should be in the component", () => {
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

test("render sign up link", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router location={history.location} navigator={history}>
            <Login />,
        </Router>,

    );
    const test = getByText(/Sign up now to join communities across the globe/);
    expect(test).toBeInTheDocument();

});
//testing line 17
test('whether sign up links to sign up page', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Login />,
        // </Router>,

    );
    const span2 = screen.getByText("Sign up now to join communities across the globe");
    // expect(span2).toHaveClass("create-hover");
    fireEvent.click(span2);
    expect(screen.getByText("Welcome to Instaphoto")).toBeInTheDocument();
    // const button = screen.getByRole('button', { name: /See All/i });
});

test('clicking the button Sign in wont navigates to Sign in Page because no user input', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Login />,
        // </Router>,

    );
    const span2 = screen.getByText("Sign in");
    // expect(span2).toHaveClass("create-hover");
    fireEvent.click(span2);
    expect(screen.getByText("Welcome to Instaphoto")).toBeInTheDocument();
    // const button = screen.getByRole('button', { name: /See All/i });
});


// //testing email with '@'
// test("validate function should pass on correct input", async () => {
//     const history = createMemoryHistory();
//     render(
//         <Router location={history.location} navigator={history}>
//             <Login />,
//         </Router>,);
//     const text = 'text@test.com'
//     const element = screen.getByLabelText("Email");
//     // await userEvent.type(element, text)
//     expect(validateInput(text)).toBe(true);
// });

test("email input should accept text",() => {
    const history = createMemoryHistory();
    const { getByLabelText } = render(
        <Router location={history.location} navigator={history}>
            <Login />,
        </Router>,);
        // const emailInputNode = getByLabelText("Email");
        const emailInputNode = screen.getByRole("textbox")
        expect(emailInputNode.value).toMatch("")
        fireEvent.change(emailInputNode,{target: {value: 'testing'}})
        expect(emailInputNode.value).toMatch("testing");
});

// test("Password input should accept text",() => {
//     const history = createMemoryHistory();
//     const { getByLabelText } = render(
//         <Router location={history.location} navigator={history}>
//             <Login />,
//         </Router>,);
//         // const emailInputNode = getByLabelText("Email");
//         const emailInputNode = screen.getByRole("textbox", {name: /PassWord /i })
//         expect(emailInputNode.value).toMatch("")
//         fireEvent.change(emailInputNode,{target: {value: 'testing'}})
//         expect(emailInputNode.value).toMatch("testing");
// });

test("render forgot password?", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
        <Router location={history.location} navigator={history}>
            <Login />,
        </Router>,

    );
    const test = getByText("Forgot password?");
    expect(test).toBeInTheDocument();

});