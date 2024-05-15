import { test } from 'node:test'
import { strictEqual } from 'node:assert'
import { readFile } from 'node:fs/promises'

import Pcall from '../src/index.js'

const { log } = console

test('async preset fn option instance call', async t => {
  await t.test('with happy option', async () => {
    const path = './test/pcall.test.json'
    const opts = { encoding: 'utf8' }

    const pcall = new Pcall({
      transformOnSuccess: (args, res) => JSON.parse(res),
      happy: true,
    })

    const res = await pcall(readFile, path, opts)

    log(':Pcall:[RES]:<<', res, '>>')
    log('\x1b[35m', t.name)

    strictEqual(res.hogo, 'fuga')
  })
})
