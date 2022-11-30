/**
 * @jest-environment jsdom
 */

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';


import React from 'react';

import { Router } from "react-router";
import { createBrowserHistory } from 'history';

import EditPost from "../components/EditPost/edit-post/edit-post";
import {BrowserRouter} from "react-router-dom";

test('image is loaded', async () => {
    const history = createBrowserHistory();
    const route = '/edit-post/h6o2_XK';
    history.push(route);
    console.log(history.location.pathname);
    render(
        <Router location={history.location} navigator={history}>
            <EditPost />,
        </Router>,
    );
    const image = await screen.findByRole("img", { name: "edit-post" });
    expect(image).toBeInTheDocument();
});

test('tags are loaded', async () => {
    const history = createBrowserHistory();
    const route = '/edit-post/h6o2_XK';
    history.push(route);
    console.log(history.location.pathname);
    render(
        <Router location={history.location} navigator={history}>
            <EditPost />,
        </Router>,
    );
    const tags = await screen.findByRole("user-tags-wrapper", { name: "user-tags" });
    expect(tags).toBeInTheDocument();
});

test('caption is loaded', async () => {
    const history = createBrowserHistory();
    const route = '/edit-post/h6o2_XK';
    history.push(route);
    console.log(history.location.pathname);
    render(
        <Router location={history.location} navigator={history}>
            <EditPost />,
        </Router>,
    );
    const caption = await screen.findByRole("caption-wrapper", { name: "caption" });
    expect(caption).toBeInTheDocument();
});