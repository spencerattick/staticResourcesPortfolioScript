const assert = require('assert');
const { addPortfolioToDesktop, requestGoodReadsData, requestMediumData } = require('../index.js');

//to run use `npm test` 
  
  //check that addPortfolioToDesktop actually adds that file to the desktop
  describe('check functions', () => {
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

  describe('requestGoodReadsData', () => {
    it('should return a stringified JSON object from the Goodreads RSS feed', async () => {
      const result = await requestGoodReadsData();
      assert.strictEqual(typeof result, 'string');
      assert.doesNotThrow(() => JSON.parse(result));
    });
  });

  describe('requesMediumData', () => {
    it('should return a stringified JSON object from the Medium RSS feed', async () => {
      const result = await requestMediumData();
      assert.strictEqual(typeof result, 'string');
      assert.doesNotThrow(() => JSON.parse(result));
    });
  });

