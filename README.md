 # GiphyQA
To run this test:
1. Download the project
2. Go to project in command line
3. Enter `npm install cypress --save-dev` into command line to download Cypress
4. Run `npx cypress open` to open Cypress's GUI system
5. When the GUI loads, double click `giphy-tests.js`
6. A Google Chrome window should open that will automatically run the tests.

# Notes
All of this was run using basic Cypress tests. I noticed that giphy.com uses React, and there are some react node packages that make it possible to test React components. If I had more time, I would've used these packages, which might've made it easier to target certain elements.
