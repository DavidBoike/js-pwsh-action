const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const { spawn } = require('child_process');

try {

    const testInput = core.getInput('test-input');
    core.info('Test Input: ' + testInput);

    let setupPath = path.join(path.dirname(__dirname), 'setup.ps1');
    core.info('Setup path: ' + setupPath);

    let commandArg = '". ' + setupPath + '"';

    let pwsh = spawn('pwsh', ['-command', commandArg]);

    pwsh.stdout.on('data', (data) => {
        console.log(data);
    });

    pwsh.stderr.on('data', (data) => {
        console.error(data);
    });

    pwsh.on('close', (code) => {
        if (code !== 0) {
            core.setFailed(`pwsh exited with code ${code}`);
        }
    });

} catch (error) {
    core.setFailed(error.message);
}