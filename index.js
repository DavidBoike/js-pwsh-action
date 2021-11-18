const core = require('@actions/core');
const path = require('path');
const runPwsh = require('run-pwsh');

const setupPs1 = path.resolve(__dirname, '../setup.ps1');
const cleanupPs1 = path.resolve(__dirname, '../cleanup.ps1');

let isPost = core.getState('isPost');
core.setState('isPost', true);

async function run() {

    if (!isPost) {

        let testInput = core.getInput('test-input');

        core.setState('ValueForPost', 'Postalicious');

        await runPwsh(setupPath, {
            name: 'David',
            testInput: testInput
        });

    } else { // Cleanup

        let postValue = core.getState('ValueForPost');

        await runPwsh(cleanupPath, { value: postValue });

    }

}

run();