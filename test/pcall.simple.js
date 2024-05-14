import { readFile } from 'node:fs/promises'

import { test } from 'node:test'
import { strictEqual } from 'node:assert'

import Pcall from '../src/index.js'
import { pline } from '../src/config.js'

test('ASYNC INSTANCE NO-OPT', async t => {
  await t.test('INSTANCE resolve NON-existing fileRead', async () => {
    const path = './test/pcall.nada.json'
    const opts = { encoding: 'utf8' }
    const pcall = new Pcall()
    const [err, res] = await pcall(readFile, path, opts)

    console.error(':Pcall:[ERR]:<<', err, '>>')
    console.debug(':Pcall:[RES]:<<', res, '>>')
    console.info('\x1b[35m', t.name)
    pline('.')
    strictEqual(err, true)
  })

  await t.test('INSTANCE resolve existing fileRead', async () => {
    const path = './test/pcall.test.json'
    const opts = { encoding: 'utf8' }
    const pcall = new Pcall()
    const [err, res] = await pcall(readFile, path, opts)

    console.error(':Pcall:[ERR]:<<', err, '>>')
    console.debug(':Pcall:[RES]:<<', res, '>>')
    console.info('\x1b[35m', t.name)
    pline('.')
    strictEqual(err, false)
  })
})

test('ASYNC CLASS NO-OPT', async t => {
  await t.test('CLASS resolve NON-existing fileRead', async () => {
    const path = './test/pcall.nada.json'
    const opts = { encoding: 'utf8' }
    const [err, res] = await Pcall(readFile, path, opts)

    console.error(':Pcall:[ERR]:<<', err, '>>')
    console.debug(':Pcall:[RES]:<<', res, '>>')
    console.info('\x1b[35m', t.name)
    pline('.')
    strictEqual(err, true)
  })

  await t.test('CLASS resolve existing fileRead', async () => {
    const path = './test/pcall.test.json'
    const opts = { encoding: 'utf8' }
    const [err, res] = await Pcall(readFile, path, opts)

    console.error(':Pcall:[ERR]:<<', err, '>>')
    console.debug(':Pcall:[RES]:<<', res, '>>')
    console.info('\x1b[35m', t.name)
    pline('.')
    strictEqual(err, false)
  })
})

// await t.todo('no await')
