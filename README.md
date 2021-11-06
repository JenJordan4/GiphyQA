 # GiphyQA
To run this test:
1. Download the project
2. Go to project in command line
3. Enter `npm install cypress --save-dev` into command line to download Cypress
4. Run `npx cypress open` to open Cypress's GUI system
5. When the GUI loads, double click `giphy-tests.js`
6. A Google Chrome window should open that will automatically run the tests.

# Test Contents
1. Makes sure a trending section exists (checks for "Trending" in the headers)
2. Clicks on a gif in the trending section (captures ID of first trending image, clicks first trending image, verifies ID exists in the new URL)
3. Checks that the search field exists
4. Types into search field (Types into search field and then verifies that the input value matches what was typed)
5. Checkes copied URL is for the correct gif

# Additional Notes
All of this was run using basic Cypress tests. As a possible more robust alternative, giphy.com uses React, and there are some react node packages that make it possible to test React components. Using one of these packages might've made it easier to target certain elements.
