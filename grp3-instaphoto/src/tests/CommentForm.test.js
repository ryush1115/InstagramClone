// CommentForm.test.js

/**
* @jest-environment jsdom
*/

// import testing library functions
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
// import FormTest from "./Form-Test"
// import renderer from 'react-test-renderer';
import React from 'react';


import CommentForm from '.././components/CommentForm';

// import Userpic from './components/test'
import { Router } from "react-router";
import { createMemoryHistory } from 'history';
import { Cancel } from '@material-ui/icons';

//testing 
test('renders text', ()=>{
    const{getByText} =  render(
        <CommentForm />
    );
    const test = "Cancel";
    expect(test).toBe("Cancel");
   })

test("Text should be in the component", () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <CommentForm />,
        </Router>,

    );
    
    const labelNode = component.getByText("Cancel");
    expect(labelNode).toBeInTheDocument();
});