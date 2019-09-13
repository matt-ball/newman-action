const core = require('@actions/core')
const newman = require('newman')

init()

async function init () {
  try {
    const get = core.getInput
    const apiBase = 'https://api.getpostman.com'
    const idRegex = /^[0-9]{7}-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/

    console.log(get('globals'))
    console.log(get('iterationCount'))

    const options = {
      apiKey: '?apikey=' + get('postmanApiKey'),
      collection: get('collection'),
      environment: get('environment'),
      globals: get('globals'),
      iterationCount: Number(get('iterationCount')),
      iterationData: get('iterationData'),
      folder: get('folder').split(','),
      workingDir: get('workingDir'),
      insecureFileRead: JSON.parse(get('insecureFileRead')),
      timeout: Number(get('timeout')),
      timeoutRequest: Number(get('timeoutRequest')),
      timeoutScript: Number(get('timeoutScript')),
      delayRequest: Number(get('delayRequest')),
      ignoreRedirects: JSON.parse(get('ignoreRedirects')),
      insecure: JSON.parse(get('insecure')),
      bail: JSON.parse(get('bail')),
      suppressExitCode: JSON.parse(get('suppressExitCode')),
      reporters: get('reporters').split(','),
      reporter: JSON.parse(get('reporter')),
      color: get('color'),
      sslClientCert: get('sslClientCert'),
      sslClientKey: get('sslClientKey'),
      sslClientPassphrase: get('sslClientPassphrase')
    }

    console.log(options.globals)
    console.log(get('iterationCount'))
    console.log(options.iterationCount)

    if (!options.apiKey) {
      core.warn('No Postman API key provided.')
    }

    if (options.collection.match(idRegex)) {
      options.collection = `${apiBase}/collections/${options.collection}${options.apiKey}`
    }

    if (options.environment.match(idRegex)) {
      options.environment = `${apiBase}/environments/${options.environment}${options.apiKey}`
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
