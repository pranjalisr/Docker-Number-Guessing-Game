import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

async function buildAndRunDockerContainer() {
  try {
    console.log('Building Docker image...');
    const { stdout: buildOutput, stderr: buildError } = await execPromise('docker build -t number-guessing-game .');
    console.log('Build output:', buildOutput);
    if (buildError) {
      console.error('Build error:', buildError);
    }

    console.log('\nRunning Docker container...');
    console.log('Note: The game will start, but you cannot interact with it in this environment.');
    console.log('To play the game, run the following command in your terminal:');
    console.log('docker run -it number-guessing-game');

    const { stdout: runOutput, stderr: runError } = await execPromise('docker run number-guessing-game');
    console.log('Run output:', runOutput);
    if (runError) {
      console.error('Run error:', runError);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

buildAndRunDockerContainer();