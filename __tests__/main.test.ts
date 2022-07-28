import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import fs from 'fs'
import { expect, test } from '@jest/globals'

test('truncates file and removes last line', () => {
    const file = path.join(__dirname, 'testdata', 'changelog.md')
    const originalOutput = fs.readFileSync(file).toString()

    process.env['INPUT_FILE'] = file
    process.env['INPUT_CHARACTERLIMIT'] = '1234'
    process.env['INPUT_REMOVELASTLINE'] = 'false'

    const node = process.execPath
    const main = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.ExecFileSyncOptions = {
        env: process.env
    }

    const output = cp.execFileSync(node, [main], options).toString()
    let charCount = 0
    for (let char of output) {
        charCount += char.length
    }

    fs.writeFileSync(file, originalOutput)

    expect(charCount).toBe(1234)
})
