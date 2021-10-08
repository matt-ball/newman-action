const core = require('@actions/core')
const newman = require('newman')

init()

async function init () {
  try {
    const get = core.getInput
    const required = { required: true }

    const options = {
      collection: get('collection', required),
      environment: get('environment'),
      reporters: 'cli'
    }

    runNewman(options)
  } catch (error) {
    core.setFailed(error.message)
  }
}

function runNewman (options) {
  newman.run(options).on('done', (err, summary) => {
    if (!options.suppressExitCode && (err || summary.run.failures.length)) {
      core.setFailed('Newman run failed!' + (err || ''))
    }
  })
}
