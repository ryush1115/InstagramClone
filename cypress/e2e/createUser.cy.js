describe('Test that we can create a new User', () => {
  it('passes if we can register and enter home page', () => {
    cy.visit('http://localhost:3000/sign-up') // visit sign up page
    cy.get('form').contains('Signup') // check that it's the sign up page

    // fill in user registration info
    cy.get('input[placeholder=Username]').type('grp3rocks').should('have.value', 'grp3rocks')
    cy.get('input[placeholder=Email]').type('grp3rocks@gmail.com').should('have.value', 'grp3rocks@gmail.com')
    cy.get('input[id=Password1]').type('testpw1234').should('have.value', 'testpw1234')
    cy.get('input[id=Password2]').type('testpw1234').should('have.value', 'testpw1234')
    
    // click on Finish button
    cy.get('button').click()

    // check that we have landed on user profile
    cy.contains('Profile')
    cy.contains('Activity Feed')
    cy.contains('grp3rocks')
    
    
  })
})