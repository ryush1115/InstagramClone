/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
// import FormTest from "./Form-Test"
// import renderer from 'react-test-renderer';
import React from 'react';

import FriendSuggestion from '.././components/FriendSuggestion.component'
import { createMemoryHistory } from 'history';

// test("should be in the component",() =>{
//     const history = createMemoryHistory();
//     const component = render(
//         <Router location={history.location} navigator={history}>
//             <Userprofile />,
//         </Router>,

//     );
//     const labelNode = component.getByText("grp3foreva");
//     expect(labelNode).toBeInTheDocument();
// });
test('renders Home Link', ()=>{
    const history = createMemoryHistory();
    const component = render(
        // <Router location={history.location} navigator={history}>
            <FriendSuggestion />,
        // </Router>,

    );
    const test = component.getByText("Home");
    expect(test).toBeInTheDocument();
  })
  