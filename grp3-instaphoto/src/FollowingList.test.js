/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByLabelText, within } from '@testing-library/dom'
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
import FollowingList from './components/FollowingList';





// test("Check if following is there",() =>{
//     const history = createMemoryHistory();
//     const {getByText} = render(
//         <Router location={history.location} navigator={history}>
//             <Login />,
//         </Router>,

//     );
//     const test = getByText("Following");
//     expect(test).toBeInTheDocument();

// });
//for create post
//https://medium.com/expedia-group-tech/ui-testing-with-react-testing-library-and-jest-f3bd9d4ec2ea
describe('Expand body button', async () => {
    it('should render OrderModuleBody when clicked', () => {
        // render your component
        render(<YourComponent />) 
        // access your button
        const button = screen.getByTestId('orderModuleHeaderButton') 
        // simulate button click
        userEvent.click(button); 

        // expect result
        await waitFor(() =>  
            expect(screen.getByText("Some content")).toBeInTheDocument());
       });
});