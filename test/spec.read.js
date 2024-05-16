import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { strictEqual } from 'node:assert'

import Pcall from '../src/index.js'

const { log } = console

test('new util instance to READ and PARSE [GOOD] json files safely', async () => {
  const readJson = new Pcall({
    fn: readFile,
    noError: true,
    args: [{ encoding: 'utf8' }],
    transformOnSuccess: (args, res) => JSON.parse(res),
    transformOnFailure: (args, { name, message }) => ({ name, message }),
  })

  const path = 'test/sample-good.json'

  const res = await readJson(path)

  log(':Pcall:[GOOD]:<<', res, '>>')

  strictEqual(res.hogo, 'fuga')
})

test('new util instance to READ and PARSE [BAD] json files safely', async () => {
  const readJson = new Pcall({
    fn: readFile,
    noError: true,
    args: [{ encoding: 'utf8' }],
    transformOnSuccess: (args, res) => JSON.parse(res),
    transformOnFailure: (args, { name, message }) => ({ name, message }),
  })

  const path = 'test/sample-bad.json'

  const res = await readJson(path)

  log(':Pcall:[BAD]:<<', res, '>>')

  strictEqual(res.name, 'SyntaxError')
})
