const core = require('@actions/core');
const path = require('path');
const readline = require('readline');
const { spawn } = require('child_process');

async function runPwsh (scriptPath, argsObject) {
    try {
        let pwshArgs = ['-command', scriptPath];

        if (argsObject) {
            let keys = Object.getOwnPropertyNames(argsObject);
            if (keys.length > 0) {
                pwshArgs.push('--arguments');
                keys.forEach(key => {
                    pwshArgs.push('-' + key);
                    pwshArgs.push(argsObject[key]);
                });
            }
        }

        let pwsh = spawn('pwsh', pwshArgs);

        pwsh.stdout.setEncoding('utf8');
        let outReader = readline.createInterface({ input: pwsh.stdout });
        outReader.on('line', (line) => {
            console.log(line);
        });

        pwsh.stderr.setEncoding('utf8');
        let errReader = readline.createInterface({ input: pwsh.stderr });
        errReader.on('line', (line) => {
            console.error(line);
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

let setupPath = path.join(path.dirname(__dirname), 'setup.ps1');

const testInput = core.getInput('test-input');

runPwsh(setupPath, {
    name: 'David',
    param2: testInput
});