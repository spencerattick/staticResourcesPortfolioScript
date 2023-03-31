const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const { parse } = require('rss-to-json');

// [] add a test file - don't want this script to mess up my portfolio 😅

const addPortfolioToDesktop = () => {
  exec('cd .. && git clone https://github.com/spencerattick/spencerattick.github.io.git && cd staticResourcesScript', (error, stdout, stderr) => {
    if (error) {
      console.error('\x1b[31m', 'There was an error changing directories or cloning the portfolio repo.');
      console.log(stderr);
      return;
    }
    console.log('Cloned a new copy of portfolio repo to the Desktop.');
  })
}

const requestGoodReadsData = async () => {
  console.log('Requesting data from GoodReads...');
    const goodReads = await parse('https://medium.com/feed/@spencer.attick');
    return JSON.stringify(goodReads);
}


const searchDesktopForPortfolio = () => {
  exec('find ~/Desktop -type d -name "spencerattick.github.io"', async (error, stdout, stderr) => {
    console.log('\x1b[32m', 'Looking for portfolio repo in the Desktop...', '\x1b[0m');
    if (error) {
      console.error('\x1b[31m', `There was an error looking for the repo: ${error}`, '\x1b[0m');
      return;
    } else if (stdout.length === 0) {
      console.log('The repo does not currently exist on the Desktop.');
      //git pull the repo onto the desktop
      addPortfolioToDesktop();
    } 
    //make the Goodreads request
    console.log(await requestGoodReadsData());
    //make the Medium request

  });
}



searchDesktopForPortfolio();