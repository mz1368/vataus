
describe('Vat Component Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('has the correct title', () => {
    cy.title().should('equal', 'Vat');
  });
  it('gross input has the correct value', () => {
    cy.get('#net').type('100');
    cy.wait(1000);
    cy.get('#gross').should('have.value','110')
  });
  it('check responsive web',()=>{

  })
})

const sizes = [[1920, 1080],[1366,768],[1536,864],[1440,900],[1280,720]]

describe('check input is located in the middle', () => {
  sizes.forEach((size) => {
    it(`Should display input on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      cy.visit('/')
      cy.get('#net').should('be.visible')
    })
  })
})