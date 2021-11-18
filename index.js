const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const readline = require('readline');
const { spawn } = require('child_process');

async function run () {
    try {
        const testInput = core.getInput('test-input');
        core.info('Test Input: ' + testInput);

        let setupPath = path.join(path.dirname(__dirname), 'setup.ps1');
        core.info('Setup path: ' + setupPath);

        //let commandArg = '". ' + setupPath + '"';

        let pwsh = spawn('pwsh', ['-command', setupPath]);

        pwsh.stdout.setEncoding('utf8');
        let outReader = readline.createInterface({ input: pwsh.stdin, output: pwsh.stdout });
        outReader.on('line', (line) => {
            console.log(line);
        });

        pwsh.stderr.setEncoding('utf8');
        let errReader = readline.createInterface({ input: pwsh.stdin, output: pwsh.stderr });
        errReader.on('line', (line) => {
            console.error(line);
        });

        pwsh.stdin.end();

        const exitCode = await new Promise( (resolve, reject) => {
            pwsh.on('close', resolve);
        });

        // outReader.close();
        // errReader.close();

        core.info('Exit code: ' + exitCode);
        if (exitCode) {
            core.setFailed(`pwsh exited with code ${exitCode}`);
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();