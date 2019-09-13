const core = require('@actions/core')
const newman = require('newman')
const fs = require('fs')

run()

async function run () {
  try {
    const apiKey = core.getInput('postmanApiKey')
    const collectionId = core.getInput('collection')
    const environmentId = core.getInput('environment')
    const apiParam = `?apikey=${apiKey}`
    const apiBase = 'https://api.getpostman.com'

    console.log(collectionId)
    console.log(fs.readFileSync('postman_collection.json'))

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
    if (err || summary.run.failures.length) {
      core.setFailed('Newman run failed!' + (err || ''))
    }
  })
}
