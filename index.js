const core = require('@actions/core')
const newman = require('newman')

init()

function safeParse (value) {
  try {
    return JSON.parse(value)
  } catch (e) {}
}

async function init () {
  try {
    const get = core.getInput
    const apiBase = 'https://api.getpostman.com'
    const idRegex = /^[0-9]{7}-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/

    const options = {
      apiKey: '?apikey=' + get('postmanApiKey'),
      collection: get('collection'),
      environment: get('environment'),
      globals: safeParse(get('globals')),
      iterationCount: Number(get('iterationCount')),
      iterationData: get('iterationData'),
      folder: get('folder').split(',').filter(v => !!v),
      workingDir: get('workingDir'),
      insecureFileRead: safeParse(get('insecureFileRead')),
      timeout: Number(get('timeout')),
      timeoutRequest: Number(get('timeoutRequest')),
      timeoutScript: Number(get('timeoutScript')),
      delayRequest: Number(get('delayRequest')),
      ignoreRedirects: safeParse(get('ignoreRedirects')),
      insecure: safeParse(get('insecure')),
      bail: safeParse(get('bail')),
      suppressExitCode: safeParse(get('suppressExitCode')),
      reporters: get('reporters').split(',').filter(v => !!v),
      reporter: safeParse(get('reporter')),
      color: get('color'),
      sslClientCert: get('sslClientCert'),
      sslClientKey: get('sslClientKey'),
      sslClientPassphrase: get('sslClientPassphrase')
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
    if (err) {
      core.setFailed(`Newman run errored: ${err}`)
    } else if (summary.run.failures.length) {
      core.setFailed(`Newman finished with ${summary.run.failures.length} failures.`)
    }
  })
}
