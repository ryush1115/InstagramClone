/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
// import FormTest from "./Form-Test"
// import renderer from 'react-test-renderer';
import React from 'react';

import { Router } from "react-router";
import { createMemoryHistory } from 'history';
import FollowingList from '../components/FollowingList-page/FollowingList';


test("render Following link",() =>{
    const history = createMemoryHistory();
    const {getByText} = render(
        <Router location={history.location} navigator={history}>
            <FollowingList />,
        </Router>,

    );
    const test = getByText(/Following/);
    expect(test).toBeInTheDocument();

});


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
// describe('Expand body button', async () => {
//     it('should render OrderModuleBody when clicked', () => {
//         // render your component
//         render(<YourComponent />) 
//         // access your button
//         const button = screen.getByTestId('orderModuleHeaderButton') 
//         // simulate button click
//         userEvent.click(button); 

//         // expect result
//         await waitFor(() =>  
//             expect(screen.getByText("Some content")).toBeInTheDocument());
//        });
// });
