/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
// import FormTest from "./Form-Test"
// import renderer from 'react-test-renderer';
import React from 'react';
import GalleryWrapper from '.././components/UserProfile/user-profile-components/userprofile'

// import Userpic from './components/test'
import { Router } from "react-router";
import { createMemoryHistory } from 'history';

//REFERENCE
//https://bobbyhadz.com/blog/react-cannot-read-property-pathname-of-undefined
//https://www.youtube.com/watch?v=hPOS6IRKJm0&t=901s

test("user profile should be in the component", () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <GalleryWrapper />,
        </Router>,

    );
    const labelNode = component.getByText("grp3foreva");
    expect(labelNode).toBeInTheDocument();

});

test("number of posts should be in the component", () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <GalleryWrapper />,
        </Router>,

    );
    const labelNode = component.getByText("posts");
    expect(labelNode).toBeInTheDocument();
});

test("number of followers should be in the component", () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <GalleryWrapper />,
        </Router>,

    );
    const labelNode = component.getByText("followers");
    expect(labelNode).toBeInTheDocument();
});

test("number of following should be in the component", () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <GalleryWrapper />,
        </Router>,

    );
    const labelNode = component.getByText("following");
    expect(labelNode).toBeInTheDocument();
});

// test("heading should be in the component", () => {
//     const history = createMemoryHistory();
//     const component = render(
//         <Router location={history.location} navigator={history}>
//             <GalleryWrapper />,
//         </Router>,
//     );
//     expect(component.getByRole("heading")).toBeInTheDocument();
// });

// test('Gallery must have images"', () => {
//     render(<Gallery/>);
//     const main = screen.getByRole('main');
//     console.log(main);
//     expect(main).toBeInTheDocument();
//     // expect(images).toHaveAttribute('alt', 'gallery iamge');
//   });
