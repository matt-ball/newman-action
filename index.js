const core = require('@actions/core')
const newman = require('newman')

run()

async function run () {
  try {
    const apiKey = core.getInput('postmanApiKey')
    const collectionId = core.getInput('collection')
    const environmentId = core.getInput('environment')
    const apiParam = `?apikey=${apiKey}`
    const apiBase = 'https://api.getpostman.com'

    const options = {
      reporters: 'cli',
      collection: `${apiBase}/collections/${collectionId}${apiParam}`,
      environment: `${apiBase}/environments/${environmentId}${apiParam}`
    }

    runNewman(options)
  } catch (error) {
    core.setFailed(error.message)
  }
}

function runNewman (options) {
  newman.run(options).on('done', (err, summary) => {
    if (err || summary.error) {
      core.setFailed(err || summary.error)
    }
  })
}
