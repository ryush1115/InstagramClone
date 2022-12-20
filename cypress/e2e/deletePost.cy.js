describe('Test that we can create a new User', () => {
  it('passes if we can register and enter home page', () => {
    cy.visit('http://localhost:3000/sign-in') // visit sign up page
    cy.get('form').contains('Sign in') // check that it's the sign up page

    // sign in
    cy.get('input[id=email]').type('amy@gmail.com', {force: true}).should('have.value', 'amy@gmail.com')
    cy.get('input[id=password]').type('$2b$10$1egluv7LAit4gC95YaZLMuv7f0UqcLNrjLq1gL/Tv0X7UaGOAvdvm', {force: true}).should('have.value', '$2b$10$1egluv7LAit4gC95YaZLMuv7f0UqcLNrjLq1gL/Tv0X7UaGOAvdvm')
    cy.get('button').click()

    // navigate to activity feed
    cy.contains('Activity Feed').click()
    // check that the post is there
    cy.contains('amycypresstest').should('exist')
    // find post and delete it
    cy.get('button[type=remove]').click({force: true})
    cy.wait(5000)
    cy.contains('amycypresstest').should('not.exist')
    
    
  })
})