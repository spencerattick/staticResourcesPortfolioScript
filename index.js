const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const { parse } = require('rss-to-json');


const searchDesktopForPortfolio = () => {
  exec('find ~/Desktop -type d -name "spencerattick.github.io"', (error, stdout, stderr) => {
    console.log('\x1b[32m', 'Looking for portfolio repo in the Desktop...', '\x1b[0m');
    if (error) {
      console.error('\x1b[31m', `There was an error looking for the repo: ${error}`, '\x1b[0m');
      return;
    } else if (stdout.length === 0) {
      console.log('The repo does not currently exist on the Desktop.');
      //git pull the repo onto the desktop
    } else if (stdout.length > 0) {
      console.log('\x1b[35m', 'The portfolio repo is already on the Desktop.', '\x1b[0m');
      //get the GoodReads and Medium feeds and update the repo
      const getGoodReads = async () => {
        console.log('Making the request to the GoodReads feed.');
        const goodReads = await parse('https://medium.com/feed/@spencer.attick');
          console.log(JSON.stringify(goodReads));
      }

      // getGoodReads();
    }
  });
}

searchDesktopForPortfolio();