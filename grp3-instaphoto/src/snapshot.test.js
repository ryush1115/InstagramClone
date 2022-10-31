/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
// import testing library functions
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { within } from '@testing-library/dom'
import WeatherApp from './App';


import App from './App';
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Userprofile from './components/userprofile.component'
import ActivityFeed from './components/activityfeed.component'
import FriendSuggestion from './components/FriendSuggestion.component'
import { createMemoryHistory } from 'history';
import { Router } from "react-router";
import Gallery from './components/gallery.component'
import SideBar from './components/sidebar.component'
import Createpost from './components/createpost.component'
import DragDrop from './components/dragdrop.component'
import FollowingList from './components/FollowingList'
test('App matches snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Login matches snapshot', () => {
    const history = createMemoryHistory();

    const component = renderer.create(
        <Router location={history.location} navigator={history}>
            <Login />,
        </Router>,);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

// test('FriendSuggestion matches snapshot', () => {
//     const history = createMemoryHistory();

//     const component = renderer.create(
//         <Router location={history.location} navigator={history}>
//             <FriendSuggestion />,
//         </Router>,);

//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });

test('SignUp matches snapshot', () => {
    const history = createMemoryHistory();

    const component = renderer.create(
        <Router location={history.location} navigator={history}>
            <SignUp />,
        </Router>,);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Activity Feed matches snapshot', () => {
    const component = renderer.create(<ActivityFeed />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

// test('Gallery matches snapshot', () => {
//     const component = renderer.create(<Gallery />);
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });

test('SideBar matches snapshot', () => {
    const component = renderer.create(<SideBar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('UserProfile matches snapshot', () => {
    const history = createMemoryHistory();

    const component = renderer.create(
        <Router location={history.location} navigator={history}>
            <Userprofile />,
        </Router>,);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('FriendSuggestion matches snapshot', () => {
    const history = createMemoryHistory();

    const component = renderer.create(
        <Router location={history.location} navigator={history}>
            <FriendSuggestion />,
        </Router>,);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('CreatePost matches snapshot', () => {
    const history = createMemoryHistory();

    const component = renderer.create(
        <Router location={history.location} navigator={history}>
            <Createpost />,
        </Router>,);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
// test('Activity Feed matches snapshot', () => {
//     const component = renderer.create(<Createpost />);
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });

test('Dragdrop matches snapshot', () => {
    const component = renderer.create(<DragDrop />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('FollowingList matches snapshot', () => {
    const history = createMemoryHistory();

    const component = renderer.create(
        <Router location={history.location} navigator={history}>
            <FollowingList />,
        </Router>,);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});