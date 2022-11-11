/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
// import FormTest from "./Form-Test"
// import renderer from 'react-test-renderer';
import React from 'react';
import Userprofile from '../components/userprofile'


// import Userpic from './components/test'
import { Router } from "react-router";
import { createMemoryHistory } from 'history';

// test("should be in the component",() =>{
//     const history = createMemoryHistory();
//     const component = render(
//         <Router location={history.location} navigator={history}>
//             <Userprofile />,
//         </Router>,

//     );
//     const labelNode = component.getAllByText("");
//     expect(labelNode).toBeInTheDocument();
// });

//https://stackoverflow.com/questions/66043164/testing-click-event-in-react-testing-library
test('clicking the button See All navigates to the FriendSuggestion Page', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Userprofile />,
        // </Router>,

    );
    const button = screen.getByRole('button', { name: /See All/i });
    expect(button).toHaveClass("show-all-btn");
    fireEvent.click(button);
    expect(screen.getByText("Instaphoto")).toBeInTheDocument();
    // const button = screen.getByRole('button', { name: /See All/i });
});

test('clicking the button Create navigates to create post page ', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Userprofile />,
        // </Router>,

    );
    const span2 = screen.getByText("Create");
    // expect(span2).toHaveClass("create-hover");
    fireEvent.click(span2);
    expect(screen.getByText("Instaphoto")).toBeInTheDocument();
    // const button = screen.getByRole('button', { name: /See All/i });
});

test('clicking the button Following navigates to Following Page ', () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Userprofile />,
        // </Router>,

    );
    const span2 = screen.getByText("667");
    // expect(span2).toHaveClass("create-hover");
    fireEvent.click(span2);
    expect(screen.getByText("Instaphoto")).toBeInTheDocument();
    // const button = screen.getByRole('button', { name: /See All/i });
});