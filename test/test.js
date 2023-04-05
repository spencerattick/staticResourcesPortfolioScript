const assert = require('assert');
const { addPortfolioToDesktop } = require('../index.js');

//to run use `npm test` 
  
  //check that addPortfolioToDesktop actually adds that file to the desktop
  describe('', () => {
    before(function() {
        // Run the function you want to test
        addPortfolioToDesktop();
    });
    it('spencerattick.github.io should be present on Desktop after addPortfolioToDesktop()', () => {
        const fs = require('fs');
        const filePath = '/Users/sattick/Desktop/spencerattick.github.io';
        const fileExists = fs.existsSync(filePath);
  
        assert.equal(fileExists, true); 
    })
  })
  

