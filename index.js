const core = require('@actions/core')
const newman = require('newman')

run()

async function run () {
  try {
    const apiKey = core.getInput('postmanApiKey')

    if (!apiKey) {
      core.warn('No Postman API key provided.')
    }

    let collection = core.getInput('collection')
    let environment = core.getInput('environment')
    const reporters = core.getInput('reporters')

    const apiParam = `?apikey=${apiKey}`
    const apiBase = 'https://api.getpostman.com'
    const idRegex = /^[0-9]{7}-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/

    if (collection.match(idRegex)) {
      collection = `${apiBase}/collections/${collection}${apiParam}`
    }

    if (environment.match(idRegex)) {
      environment = `${apiBase}/environments/${environment}${apiParam}`
    }

    const options = { reporters, collection, environment }

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
