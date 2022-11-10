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

import SingleLineUserInfo from '.././components/SingleLineUserInfo'

test("test the single-line user information",async () =>{
    render(<SingleLineUserInfo name={"Williams"} description={"This is a cool person"} image={null} isfollowed={true} />)

   

    const name = screen.getByText("Williams");
    expect(name).toBeInTheDocument();

    const description = screen.getByText("This is a cool person");
    expect(description).toBeInTheDocument();

    const followStatus = screen.getByText("Unfollow");
    expect(followStatus).toBeInTheDocument();
    expect(followStatus).toHaveTextContent('Unfollow')

    await userEvent.click(followStatus);
    expect(followStatus).toHaveTextContent('Follow')
    
    await userEvent.click(followStatus);
    expect(followStatus).toHaveTextContent('Unfollow')

});

