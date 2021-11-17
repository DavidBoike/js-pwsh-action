const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const { spawn } = require('child_process');

try {

    const testInput = core.getInput('test-input');
    core.info('Test Input: ' + testInput);

    core.info(__dirname);

    let ps1Path = path.join(path.basename(__dirname), 'setup.ps1');
    core.info(ps1Path);

    //console.log(JSON.stringify(github));

    // let setupPath = path.join(github.context.action_path, 'setup.ps1');
    // console.log('Setup path: ' + setupPath);

    // let commandArg = '". ' + setupPath + '"';

    // let pwsh = spawn('pwsh', ['-command', commandArg]);

    // ls.stdout.on('data', (data) => {
    //     console.log(data);
    // });

    // ls.stderr.on('data', (data) => {
    //     console.error(data);
    // });

    // ls.on('close', (code) => {
    //     if (code !== 0) {
    //         core.setFailed(`pwsh exited with code ${code}`);
    //     }
    // });

} catch (error) {
    core.setFailed(error.message);
}