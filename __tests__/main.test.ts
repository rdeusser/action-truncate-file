import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

test('truncates file and removes last line', () => {
  process.env['INPUT_FILE'] = path.join(__dirname, 'testdata', 'changelog.md')
  process.env['INPUT_CHARACTERLIMIT'] = '1234'
  process.env['INPUT_REMOVELASTLINE'] = 'false'

  const node = process.execPath
  const main = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }

  const output = cp.execFileSync(node, [main], options).toString()

  expect(output.length).toBe(1234)
})
