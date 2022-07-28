import * as core from '@actions/core'
import fs from 'fs'

async function run(): Promise<void> {
  try {
    const file = core.getInput('file', {required: true})
    const characterLimit = Number(
      core.getInput('character_limit', {required: true})
    )
    const removeLastLine = core.getBooleanInput('remove_last_line')

    core.debug(new Date().toTimeString())
    fs.truncateSync(file, characterLimit)

    if (removeLastLine) {
      const content = fs.readFileSync(file).toString()
      const lines = content.split('\n')
      lines.splice(lines.indexOf(lines[lines.length - 1]), 1)
      fs.writeFileSync(file, lines.join('\n'))
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
