
// import testing library functions
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import {within} from '@testing-library/dom'

import App from './App';

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

