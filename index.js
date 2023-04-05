const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const { parse } = require('rss-to-json');
const fs = require('fs');

// [] refactor exec() functions to use async/await and try/catch


const addPortfolioToDesktop = () => {
  const filePath = '/Users/sattick/Desktop/spencerattick.github.io';
  if (fs.existsSync(filePath)) {
    console.log('RETURNNNN')
    return;
  }
  exec('cd .. && git clone https://github.com/spencerattick/spencerattick.github.io.git && cd staticResourcesScript', (error, stdout, stderr) => {
    if (error) {
      console.error('\x1b[31m', 'There was an error changing directories or cloning the portfolio repo.');
      console.log(stderr);
      return;
    }
    console.log('Cloned a new copy of portfolio repo to the Desktop.');
  })
}

const requestMediumData = async () => {
  console.log('Requesting data from Medium...');
    const medium = await parse('https://medium.com/feed/@spencer.attick');
    return JSON.stringify(medium);
}

const requestGoodReadsData = async () => {
  console.log('Requesting data from GoodReads...');
    const goodReads = await parse('https://www.goodreads.com/user/updates_rss/104822881');
    return JSON.stringify(goodReads);
}

const updateStaticFiles = (data, fileName) => {
  // Write an empty string to the file
  fs.writeFile(fileName, '', (err) => {
    if (err) throw err;
    console.log(`The ${fileName} is now empty!`);
  });
  
  //repopulate with new JSON
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log(`The ${fileName} is now repopulated!`);
  });
}

const pushChangesToGitHub = async () => {
  const directoryPath = '/Users/sattick/Desktop/spencerattick.github.io';
  const commitMessage = 'update static resources';

  try {
    await execPromise(`cd ${directoryPath} && npm install && npm run build`);
    console.log(`Changed to ${directoryPath} and ran npm install and npm run build`);

    await execPromise(`cd ${directoryPath} && git add .`);
    console.log(`Added changes to staging`);

    await execPromise(`cd ${directoryPath} && git commit -m "${commitMessage}"`);
    console.log(`Committed changes with message "${commitMessage}"`);

    await execPromise(`cd ${directoryPath} && git push`);
    console.log('Pushed changes to GitHub');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
};


const searchDesktopForPortfolio = async () => {
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
    const goodReadsFileName = '/Users/sattick/Desktop/spencerattick.github.io/assets/staticGoodreadsFeed.json';
    const mediumFileName = '/Users/sattick/Desktop/spencerattick.github.io/assets/staticMediumFeed.json';

    await updateStaticFiles(await requestGoodReadsData(), goodReadsFileName);
    //make the Medium request
    await updateStaticFiles(await requestMediumData(), mediumFileName);

    pushChangesToGitHub();

  });
}


const runScript = () => {
  searchDesktopForPortfolio();
};

if (require.main === module) {
  // code to execute if this file is run directly (i.e., not required by another file)
  runScript();
}


module.exports = {
  addPortfolioToDesktop
};


