const core = require('@actions/core')
const newman = require('newman')

run()

async function run () {
  try {
    const options = {
      collection: core.getInput('collection'),
      environment: core.getInput('environment')
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
