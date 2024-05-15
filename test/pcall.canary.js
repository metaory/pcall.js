import { readFile } from 'node:fs/promises'

import { test } from 'node:test'
import { strictEqual } from 'node:assert'

import Pcall from '../src/index.js'

const { log } = console

test('async option instance call', async t => {
  await t.test('custom onSuccess and onFailure options', async () => {
    const path = './test/pcall.test.json'
    const opts = { encoding: 'utf8' }

    const pcall = new Pcall({
      onSuccess: (args, res) => log('@:SUCCESS', { args, res }),
      onFailure: (args, err) => log('@:FAILURE', { args, err }),
      transformOnSuccess: (args, res) => JSON.parse(res),
      transformOnFailure: (args, cause) => new Error('BAD', { cause }),
      cleanup: opts => log('@CLEANUP', { opts }),
      trace: true,
    })

    const [err, res] = await pcall(readFile, path, opts)

    log(':Pcall:[ERR]:<<', err, '>>')
    log(':Pcall:[RES]:<<', res, '>>')
    log('\x1b[35m', t.name)
    strictEqual(err, false)
    strictEqual(res.hogo, 'fuga')
  })
})
