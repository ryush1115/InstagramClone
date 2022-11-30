// Comments.test.js

/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
// import FormTest from "./Form-Test"
// import renderer from 'react-test-renderer';
import React from 'react';

import Comment from '.././components/ActivityFeed/activityfeed-components/Comment';

// import Userpic from './components/test'
import { Router } from "react-router";
import { createMemoryHistory } from 'history';
import { Cancel } from '@material-ui/icons';

test("Text should be in the component", () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <Comment />,
        </Router>,

    );
    const labelNode = component.getByText("Edit");
    expect(labelNode).toBeInTheDocument();
});