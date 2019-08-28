const core = require('@actions/core')

async function run () {
  try {
    const collection = core.getInput('collection')
    const environment = core.getInput('environment')

    console.log(collection, environment)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
