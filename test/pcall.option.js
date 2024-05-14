import { readFile } from 'node:fs/promises'

import { test } from 'node:test'
import { strictEqual } from 'node:assert'

import Pcall from '../src/index.js'

const { log } = console

test('ASYNC INSTANCE OPT', async t => {
  await t.test('INSTANCE OPT:onSuccess, onFailure on NON-existing fileRead', async () => {
    const path = './test/pcall.test.json'
    const opts = { encoding: 'utf8' }
    const pcall = new Pcall({
      onSuccess: (args, res) => log('@:SUCCESS', { args, res }),
      onFailure: (args, err) => log('@:FAILURE', { args, err }),
    })
    const [err, res] = await pcall(readFile, path, opts)

    console.error(':Pcall:[ERR]:<<', err, '>>')
    console.debug(':Pcall:[RES]:<<', res, '>>')
    console.info('\x1b[35m', t.name)
    strictEqual(err, false)
  })

  await t.test('INSTANCE OPT:transformOnSuccess on existing fileRead', async () => {
    const path = './test/pcall.test.json'
    const opts = { encoding: 'utf8' }
    const pcall = new Pcall({
      transformOnSuccess: (args, res) => JSON.parse(res),
    })

    const [err, res] = await pcall(readFile, path, opts)

    console.error(':Pcall:[ERR]:<<', err, '>>')
    console.debug(':Pcall:[RES]:<<', res, '>>')
    console.debug(':Pcall:[JSN]:<<', res.endOfLine, '>>')
    console.info('\x1b[35m', t.name)
    strictEqual(err, false)
    // strictEqual(typeof res, 'object')
  })

  await t.test('INSTANCE OPT:transformOnFailure on non-existing fileRead', async () => {
    const path = './test/pcall.nada.json'
    const opts = { encoding: 'utf8' }
    const pcall = new Pcall({
      transformOnFailure: (args, cause) => new Error('BAD', { cause }),
    })

    const [err, res] = await pcall(readFile, path, opts)

    console.error(':Pcall:[ERR]:<<', err, '>>')
    console.debug(':Pcall:[RES]:<<', res, '>>')
    console.info('\x1b[35m', t.name)
    strictEqual(err, true)
  })
})

//
// test.skip('TODO::bad options', {}, () => {})
// test.skip('TODO::bad invoke', {}, () => {})
// test.skip('TODO::bad executor', {}, () => {})
// test.skip('TODO::bad args', {}, () => {})
