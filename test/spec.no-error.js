import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { strictEqual } from 'node:assert'

import Pcall from '../src/index.js'

const { log } = console

test('NO ERROR call to resolve AsyncFunction [GOOD]', async () => {
  const path = 'test/sample-good.json'
  const opts = { encoding: 'utf8' }
  const pcall = new Pcall({ noError: true })

  const res = await pcall(readFile, path, opts)

  log(':Pcall:[GOOD]:res<<', res, '>>')

  strictEqual(typeof res, 'string')
})
