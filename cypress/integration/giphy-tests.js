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

  it('Types text into search field', function(){
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

  it('verifies new URL is the same as the clicked gif', function(){
    let picSourceId

    cy.visit('https://giphy.com/')
    cy.get('h3').contains('trending', { matchCase: false }).parent().next().wait(500).children().within(() => { //waits for trending gifs to load, because the page loads asynconously 
      cy.get('ul > li:first').get('picture').children().get('source').invoke('attr', 'srcset').then( picSource => { //takes the first trending image and gets its srcset attribute
        picSourceId = picSource.split('/')[4] //gets the ID out of the srcset attribute
        cy.get('ul > li:first').click() //clicks the first trending image
        cy.wait(500)
      })
    })
    cy.get('span').contains('Share').click() //click Share
    cy.get('div[class^="CopyWrapper"] > button').click()
  })

  it('Verifies share link is for the correct gif', () => {
  // If this test is triggered directly from a Code IDE upon saving, it will likely error out with the message 'Cannot set property message of [object DOMException] which has only a getter'
  // This is likely due to failure in the 'navigator.clipboard' call, resulting in a DOM error object being returned
  // However, it will work correctly if the tests are triggered directly from the Cypress interface, using the Electron browser
  
    let picSourceId
    cy.visit('https://giphy.com/')
    cy.get('h3').contains('trending', { matchCase: false }).parent().next().wait(500).children().within(() => { //waits for trending gifs to load, because the page loads asynconously 
      cy.get('ul > li:first').get('picture').children().get('source').invoke('attr', 'srcset').then( picSource => { //takes the first trending image and gets its srcset attribute
        picSourceId = picSource.split('/')[4] //gets the ID out of the srcset attribute
        cy.get('ul > li:first').click() //clicks the first trending image
        cy.wait(500)
      })
    }).then(() => {
      cy.get('span').contains('Share').click() //click Share
      cy.get('div[class^="CopyWrapper"] > button').click()
  
      // Supposedly, on Chrome, this will prompt the browser to ask the user for permission (https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__clipboard/cypress/integration/spec.js)
      // However, it appears that it may not be possible in Chrome at all: https://stackoverflow.com/a/59556399
      // This function works as expected in the Electron browser
      cy.window().its('navigator.clipboard').invoke('readText').should('contain', picSourceId)
    })
  })

})