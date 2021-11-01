const { waitForDebugger } = require("inspector")

describe('Test Giphy site', function () {

  it('Makes sure a trending section exists', function(){
    cy.visit('https://giphy.com/')
    cy.get('h3').contains('trending', { matchCase: false }) // Looks for a heading that says "trending", no matter the case
  })

  it('Clicks on a gif in trending section', function(){
    cy.visit('https://giphy.com/')
    cy.get('h3').contains('trending', { matchCase: false }).parent().next().wait(500).children().within(() => { //waits for trending gifs to load, because the page loads asynconously 
      cy.get('ul > li:first').get('picture').children().get('source').invoke('attr', 'srcset').then( picSource => { //takes the first trending image and gets its srcset attribute
        let picSourceId = picSource.split('/')[4] //gets the ID out of the srcset attribute
        cy.get('ul > li:first').click() //clicks the first trending image
        cy.wait(500)
        cy.url().should('include', picSourceId) //ensures that the URL is for the correct image
      })
    })
  })

  it('Checks that search field exists', function(){
    cy.visit('https://giphy.com/')
    cy.get('#searchbar')
  })

  it('Can type text into search field', function(){
    cy.visit('https://giphy.com/')
    cy.get('#searchbar').click().type('qa test')
    cy.get('input').should('have.value', 'qa test') //verifies that the text was added to the search bar
  })

  it('Verifies results are displayed after a search', function(){
    cy.visit('https://giphy.com/')
    cy.get('#searchbar').click().type('qa test')
    cy.get('a[class^="SearchButtonContainer"]').click().wait(500) //clicks the submit button and waits for new page to load
    cy.get('h1').contains('qa test')
  })
})