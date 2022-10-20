
// import testing library functions
import { render, screen , fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import {within} from '@testing-library/dom'
import FormTest from "./Form-Test"
import renderer from 'react-test-renderer';
import React from 'react';
import {within} from '@testing-library/dom'



import App from './App';
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Userprofile from './components/userprofile.component'
import ActivityFeed from './components/activityfeed.component'
import FriendBar from './components/friendbar.component'
import FriendSuggestion from './components/FriendSuggestion.component'


// import Userpic from './components/test'
import Gallery from './components/gallery.component'
import Sidebar from './components/sidebar.component'
import Createpost from './components/createpost.component'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// what to test
// If click a button, and showing something on the screen
// if click a button, and navigate to another page
// Just render the component, and you will reach the 60%

// follow/unfollow suggestion
// this is a list of data. in db, you have list of people you follow (for those people, the follow attribute is true).
// you will get the db with the follow/unfollow status.
// just render them with 

// test click event on Login 
describe("log in form",() =>{
it("renders default state", () =>{
  const{getByTestId}=render(<FormTest />);
  
  const username = getByTestID
})
});

// get the element inside the form 





test('All Textbox empty after clicking on Sign in', async () => {
  // render the component
  render(<Login />);
  // create a reference to the textbox
  const element = screen.getByRole('textbox')

  // type some text (douala) into the textbox
  await userEvent.type(element,  'douala');

  // assertion: verify that the text is in the textbox
  expect(element).toHaveValue('douala')

  // fire a click on the a link (city) button
  await userEvent.click(screen.getByText('Sign in'));

  // assertion: verify that the textbox is empty
  expect(element).toHaveValue('');});


  // test click event on SignUp
  test('All Textbox empty after clicking on Sign Up', async () => {
    // render the component
    render(<SignUp />);
    // create a reference to the textbox
    const element = screen.getByRole('textbox')
  
    // type some text (douala) into the textbox
    await userEvent.type(element,  'douala');
  
    // assertion: verify that the text is in the textbox
    expect(element).toHaveValue('douala')
  
    // fire a click on the a link (city) button
    await userEvent.click(screen.getByText('Sign in'));
  
    // assertion: verify that the textbox is empty
    expect(element).toHaveValue('');});