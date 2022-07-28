import * as core from '@actions/core'
import {promises as fs} from 'fs'

function toEntries<T>(a: T[]): readonly [number, T][] {
  return a.map((value, index) => [index, value])
}

async function run(): Promise<void> {
  try {
    const file: string = core.getInput('file', {required: true})
    const characterLimit = Number(
      core.getInput('characterLimit', {required: true})
    )
    const removeLastLine: boolean = core.getBooleanInput('removeLastLine')

    core.debug(new Date().toTimeString())

    fs.truncate(file, characterLimit)

    if (removeLastLine) {
      const buffer = await fs.readFile(file)
      const content = buffer.toString().split('\n')
      for (const [index, line] of toEntries(content))
        if (index === content.length - 1) {
          fs.truncate(file, line.length)
        }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
