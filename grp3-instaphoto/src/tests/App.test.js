/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen , fireEvent} from '@testing-library/react';
// import FormTest from "./Form-Test"
// import renderer from 'react-test-renderer';
import React from 'react';



import App from '.././App';

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

// what to test
// If click a button, and showing something on the screen
// if click a button, and navigate to another page
// Just render the component, and you will reach the 60%



// // test click event on Login 
// describe("log in form",() =>{
// it("renders default state", () =>{
//   const{getByTestId}=render(<FormTest />);
  
//   const username = getByTestID
// })
// });

// get the element inside the form 





// test('All Textbox empty after clicking on Sign in', async () => {
//   // render the component
//   render(<Login />);
//   // create a reference to the textbox
//   const element = screen.getByRole('textbox')

//   // type some text (douala) into the textbox
//   await userEvent.type(element,  'douala');

//   // assertion: verify that the text is in the textbox
//   expect(element).toHaveValue('douala')

//   // fire a click on the a link (city) button
//   await userEvent.click(screen.getByText('Sign in'));

//   // assertion: verify that the textbox is empty
//   expect(element).toHaveValue('');});


//   // test click event on SignUp
//   test('All Textbox empty after clicking on Sign Up', async () => {
//     // render the component
//     render(<SignUp />);
//     // create a reference to the textbox
//     const element = screen.getByRole('textbox')
  
//     // type some text (douala) into the textbox
//     await userEvent.type(element,  'douala');
  
//     // assertion: verify that the text is in the textbox
//     expect(element).toHaveValue('douala')
  
//     // fire a click on the a link (city) button
//     await userEvent.click(screen.getByText('Sign in'));
  
//     // assertion: verify that the textbox is empty
//     expect(element).toHaveValue('');});