const core = require('@actions/core');
const path = require('path');
const runPwsh = require('run-pwsh');

async function run() {
    let cleanupPath = path.resolve(__dirname, '../../cleanup.ps1');

    await runPwsh(cleanupPath);
}

run();