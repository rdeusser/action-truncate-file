import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import fs from 'fs'
import {expect, test} from '@jest/globals'

test('truncates file', () => {
  const file = path.join(__dirname, 'testdata', 'changelog.md')
  const originalOutput = fs.readFileSync(file).toString()

  process.env['INPUT_FILE'] = file
  process.env['INPUT_CHARACTER_LIMIT'] = '1234'
  process.env['INPUT_REMOVE_LAST_LINE'] = 'false'

  const node = process.execPath
  const main = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }

  cp.execFileSync(node, [main], options).toString()

  const output = fs.readFileSync(file).toString()
  fs.writeFileSync(file, originalOutput)

  expect(output.length).toBe(1234)
})

test('truncates file and removes last line', () => {
  const file = path.join(__dirname, 'testdata', 'changelog.md')
  const originalOutput = fs.readFileSync(file).toString()

  process.env['INPUT_FILE'] = file
  process.env['INPUT_CHARACTER_LIMIT'] = '1234'
  process.env['INPUT_REMOVE_LAST_LINE'] = 'true'

  const node = process.execPath
  const main = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }

  cp.execFileSync(node, [main], options).toString()

  const output = fs.readFileSync(file).toString()
  fs.writeFileSync(file, originalOutput)

  expect(output.length).toBe(1218)
})
