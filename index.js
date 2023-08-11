const core = require('@actions/core')
const newman = require('newman')

init()

async function init () {
  try {
    const required = { required: true }
    const idRegex = /^[0-9]{7,}-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/

    const options = {
      apiKey: get('apiKey'),
      collection: get('collection', required),
      apiBase: get('apiBase', required),
      environment: get('environment'),
      envVar: safeParse(get('envVar')),
      globals: get('globals'),
      globalVar: safeParse(get('globalVar')),
      iterationCount: num(get('iterationCount')),
      iterationData: get('iterationData'),
      folder: safeParse(get('folder')),
      workingDir: get('workingDir'),
      insecureFileRead: safeParse(get('insecureFileRead')),
      timeout: num(get('timeout')),
      timeoutRequest: num(get('timeoutRequest')),
      timeoutScript: num(get('timeoutScript')),
      delayRequest: num(get('delayRequest')),
      ignoreRedirects: safeParse(get('ignoreRedirects')),
      insecure: safeParse(get('insecure')),
      bail: safeParse(get('bail')),
      suppressExitCode: safeParse(get('suppressExitCode')),
      reporters: safeParse(get('reporters')),
      reporter: safeParse(get('reporter')),
      color: get('color'),
      sslClientCert: get('sslClientCert'),
      sslClientKey: get('sslClientKey'),
      sslClientPassphrase: get('sslClientPassphrase'),
      sslClientCertList: safeParse(get('sslClientCertList')),
      sslExtraCaCerts: get('sslExtraCaCerts'),
      requestAgents: safeParse(get('requestAgents')),
      cookieJar: get('cookieJar')
    }

    if (options.collection.match(idRegex)) {
      if (!options.apiKey) {
        core.setFailed('No Postman API key provided for collection retrieval.')
      }
      options.collection = `${apiBase}/collections/${options.collection}?apikey=${options.apiKey}`
    }

    if (options.environment && options.environment.match(idRegex)) {
      if (!options.apiKey) {
        core.setFailed('No Postman API key provided for environment retrieval.')
      }
      options.environment = `${apiBase}/environments/${options.environment}?apikey=${options.apiKey}`
    }

    runNewman(removeEmpty(options))
  } catch (error) {
    core.setFailed(error.message)
  }
}

function get (key, opts) {
  const val = core.getInput(key, opts)
  return val !== '' ? val : null
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

function num (i) {
  if (i) {
    return Number(i)
  }

  return i
}

function removeEmpty (obj) {
  return Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
}

function runNewman (options) {
  newman.run(options, (err) => {
    if (err) {
      core.setFailed('Newman run failed! ' + (err || ''))
    }
  }).on('done', (err, summary) => {
    if (!options.suppressExitCode && (err || summary.run.failures.length)) {
      core.setFailed('Newman run failed! ' + (err || ''))
    }
  })
}
