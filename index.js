const core = require('@actions/core');
const exec = require('@actions/exec');
const path = require('path');
const runPwsh = require('run-pwsh');

const setupPs1 = path.resolve(__dirname, '../setup.ps1');
const cleanupPs1 = path.resolve(__dirname, '../cleanup.ps1');

// Only one endpoint, so determine if this is the post action, and set it true so that
// the next time we're executed, it goes to the post action
let isPost = core.getState('isPost');
core.saveState('isPost', true);

async function run() {

    try {

        if (!isPost) {

            let testInput = core.getInput('test-input');

            core.saveState('ValueForPost', 'Postalicious');

            await exec.exec('pwsh', ['-File', setupPs1, '-name', 'David', '-testInput', testInput]);

        } else { // Cleanup

            let postValue = core.getState('ValueForPost');

            await exec.exec('pwsh', ['-File', cleanupPs1, '-value', postValue]);

        }

    } catch (err) {
        core.setFailed(err);
    }

}

run();