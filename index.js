const core = require('@actions/core');
const path = require('path');
const runPwsh = require('run-pwsh');

async function run() {
    let setupPath = path.resolve(__dirname, '../setup.ps1');
    let testInput = core.getInput('test-input');

    await runPwsh(setupPath, {
        name: 'David',
        testInput: testInput
    });
}

run();