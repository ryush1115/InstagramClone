

// import testing library functions
// import '@testing-library/jest-dom/extend-expect';
import { render, screen , fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import renderer from 'react-test-renderer';
// import {within} from '@testing-library/dom'
// import FormTest from "./Form-Test"
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


//LETS START TESTING 
//1. App.js (rendering)
test('renders Login Link', ()=>{
  const{getByText} =  render(
      <App />
  );
  const test = getByText(/Login/);
  expect(test).toBeInTheDocument();
})

test('renders Friend Suggestion', ()=>{
  const{getByText} =  render(
      <App />
  );
  const test = getByText("Friend Suggestion");
  expect(test).toBeInTheDocument();
})

test('renders User Profile', ()=>{
  const{getByText} =  render(
      <App />
  );
  const linkElement = getByText("User Profile");
  expect(linkElement).toBeInTheDocument();
})

test('renders Activity Feed', ()=>{
  const{getByText} =  render(
      <App />
  );
  const linkElement = getByText("Activity Feed");
  expect(linkElement).toBeInTheDocument();
})

test('renders Create Post', ()=>{
  const{getByText} =  render(
      <App />
  );
  const linkElement = getByText("Create Post");
  expect(linkElement).toBeInTheDocument();
})
