const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
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
        pwsh.stdout.on('data', (data) => {
            console.log(data.trim());
        });

        pwsh.stderr.setEncoding('utf8');
        pwsh.stderr.on('data', (data) => {
            console.error(data.trim());
        });

        pwsh.stdin.end();

        const exitCode = await new Promise( (resolve, reject) => {
            pwsh.on('close', resolve);
        });

        core.info('Exit code: ' + exitCode);
        if (exitCode) {
            core.setFailed(`pwsh exited with code ${exitCode}`);
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();