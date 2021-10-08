const core = require('@actions/core')
const newman = require('newman')

init()

async function init () {
  try {
    const get = core.getInput
    const required = { required: true }
    const apiBase = 'https://api.postman.com'
    const idRegex = /^[0-9]{7,}-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/

    const options = {
      apiKey: '?apikey=' + get('apiKey'),
      collection: get('collection', required),
      environment: get('environment'),
      globals: get('globals'),
      iterationCount: Number(get('iterationCount')),
      iterationData: get('iterationData'),
      folder: split(get('folder')),
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
      reporters: split(get('reporters')),
      reporter: safeParse(get('reporter')),
      color: get('color'),
      sslClientCert: get('sslClientCert'),
      sslClientKey: get('sslClientKey'),
      sslClientPassphrase: get('sslClientPassphrase'),
      sslClientCertList: split(get('sslClientCertList')),
      sslExtraCaCerts: get('sslExtraCaCerts'),
      requestAgents: safeParse(get('requestAgents')),
      cookieJar: get('cookieJar')
    }

    if (!options.apiKey) {
      core.warning('No Postman API key provided.')
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

function safeParse (obj) {
  if (obj) {
    try {
      return JSON.parse(obj)
    } catch (e) {
      core.warning('Bad object passed in config!')
    }
  }

  return null
}

function split (str) {
  return str.split(',')
}

function runNewman (options) {
  core.debug('options')
  core.debug(options)
  newman.run(options)
    .on('beforeRequest', (err, args) => {
      console.log(err)
    })
    .on('request', (err, args) => {
      console.log(err)
    })
    .on('done', (err, summary) => {
      core.debug('done')
      core.debug(err)
      core.debug(summary.err)
      console.log(err)
      console.log(summary.error)
      if (!options.suppressExitCode && (err || summary.run.failures.length)) {
        core.setFailed('Newman run failed!' + (err || ''))
      }
    })
}
