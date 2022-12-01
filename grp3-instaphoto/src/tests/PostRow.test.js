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

import PostRow from '.././components/ActivityFeed/activityfeed-components/PostRow'

// import Userpic from './components/test'
import { Router } from "react-router";
import { createMemoryHistory } from 'history';

// test("should be in the component", () => {
//     const history = createMemoryHistory();
//     const component = render(
//         <Router location={history.location} navigator={history}>
//             <ActivityFeed />,
//         </Router>,
//     );
//     const labelNode = component.getByText("grp3foreva");
//     expect(labelNode).toBeInTheDocument();
// });

test("test alt text",async () =>{
    render(<PostRow />)
    const inputNode = screen.getByAltText("");
    expect(inputNode).toBeInTheDocument();
});