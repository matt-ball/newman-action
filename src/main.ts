import * as core from '@actions/core'
import * as newman from 'newman'

const apiBase = 'https://api.getpostman.com'
const apiKey = core.getInput('apiKey', {required: true})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeParse(obj: string): any {
  if (obj && obj !== '') {
    try {
      return JSON.parse(obj)
    } catch (e) {
      core.warning('Bad object passed in config!')
    }
  }

  return null
}

function collectionURL(): string {
  const collection = core.getInput('collection', {required: true})

  return `${apiBase}/collections/${collection}?apikey=${apiKey}`
}

function environmentURL(): string | undefined {
  const environment = core.getInput('environment')
  if (environment !== undefined && environment !== '') {
    return `${apiBase}/environments/${environment}?apikey=${apiKey}`
  }

  return undefined
}

// Need to satisfy TypeScript
function parseColor(input: string): 'on' | 'off' | 'auto' | undefined {
  switch (input) {
    case 'on' || 'off' || 'auto':
      return input
  }

  return undefined
}

async function run(): Promise<void> {
  try {
    const options: newman.NewmanRunOptions = {
      collection: collectionURL(),
      environment: environmentURL(),
      globals: core.getInput('globals'),
      iterationCount: Number(core.getInput('iterationCount')),
      iterationData: core.getInput('iterationData'),
      folder: core.getInput('folder'),
      workingDir: core.getInput('workingDir'),
      insecureFileRead: core.getInput('insecureFileRead') === 'true',
      timeout: Number(core.getInput('timeout')),
      timeoutRequest: Number(core.getInput('timeoutRequest')),
      timeoutScript: Number(core.getInput('timeoutScript')),
      delayRequest: Number(core.getInput('delayRequest')),
      ignoreRedirects: safeParse(core.getInput('ignoreRedirects')),
      insecure: safeParse(core.getInput('insecure')),
      bail: safeParse(core.getInput('bail')),
      suppressExitCode: safeParse(core.getInput('suppressExitCode')),
      reporters: core.getInput('reporters').split(','),
      reporter: safeParse(core.getInput('reporter')),
      color: parseColor(core.getInput('color')),
      sslClientCert: core.getInput('sslClientCert'),
      sslClientKey: core.getInput('sslClientKey'),
      sslClientPassphrase: core.getInput('sslClientPassphrase'),
      requestAgents: safeParse(core.getInput('requestAgents'))
    }

    core.debug(new Date().toTimeString())
    newman.run(options).on('done', (err, summary) => {
      if (!options.suppressExitCode && (err || summary.run.failures.length)) {
        core.setFailed(`Newman run failed! ${err || ''}`)
      }
    })
    core.debug(new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
