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

import MainFeed from '../components/ActivityFeed/activityfeed.component'

// import Userpic from './components/test'
import { Router } from "react-router";
import { createMemoryHistory } from 'history';


test("test MainFeed",async () =>{
    const history = createMemoryHistory();

    render(
        <Router location={history.location} navigator={history}>
            <MainFeed />
        </Router>
    );
    const test = screen.getByText("Instaphoto");
    expect(test).toBeInTheDocument();
});