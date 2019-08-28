const core = require('@actions/core')
const newman = require('newman')

run()

async function run () {
  try {
    const apiKey = core.getInput('postmanApiKey')
    const apiParam = `?apikey=${apiKey}`

    const options = {
      collection: core.getInput('collection') + apiParam,
      environment: core.getInput('environment') + apiParam
    }

    runNewman(options)
  } catch (error) {
    core.setFailed(error.message)
  }
}

function runNewman (options) {
  newman.run(options, (err) => {
    if (err) { throw err }
    console.log('collection run complete!')
  })
}
