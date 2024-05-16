import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { strictEqual } from 'node:assert'

import Pcall from '../src/index.js'

const { log } = console

test('STATIC call to resolve AsyncFunction [GOOD]', async () => {
  const path = 'test/sample-good.json'
  const opts = { encoding: 'utf8' }

  const [err, res] = await Pcall(readFile, path, opts)

  log(':Pcall:[GOOD]:res<<', res, '>>')
  log(':Pcall:[GOOD]:err<<', err, '>>')

  strictEqual(err, false)
  strictEqual(typeof res, 'string')
})

test('STATIC call to resolve AsyncFunction [BAD]', async () => {
  const path = 'nada.json'
  const opts = { encoding: 'utf8' }

  const [err, res] = await Pcall(readFile, path, opts)

  log(':Pcall:[BAD]:res<<', res, '>>')
  log(':Pcall:[BAD]:err<<', err, '>>')

  strictEqual(err, true)
  strictEqual(res.constructor.name, 'Error')
})
