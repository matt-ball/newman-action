import * as core from '@actions/core';

async function run() {
  try {
    const myInput = core.getInput('collection');
    const env = core.getInput('environment')
    core.debug(`Hello ${myInput}`);
    console.log(env)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
