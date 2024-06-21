import { strictEqual } from 'node:assert'
import { test } from 'node:test'
import { readFile } from 'node:fs/promises'

import { sep, mkPromise } from './test-util.js'
import Pcall from '../src/index.js'

const { log } = console

sep('_')

test('---STATIC--- [GOOD]', async () => {
  sep('#')
  const path = 'test/sample-good.json'
  const opts = { encoding: 'utf8' }
  const [err, res] = await Pcall(readFile, path, opts)
  log('@STATIC::', res, '::')
  log('>>', { err, res }, '<<<')
  strictEqual(err, null)
})

test('---INSTANCE--- [GOOD]', async () => {
  sep('#')
  const path = 'test/sample-good.json'
  const opts = { encoding: 'utf8' }
  const pcall = new Pcall({
    onSuccess: (res) => {
      console.log('CUSTOM onSuccess handler', {args, res})
    },
    onFailure: 'foo', // illegals will be ignored
  })
  log('pcall', pcall)
  const [err, res] = await pcall(readFile, path, opts)
  log('@INSTANCE::', { err, res }, '::')
  strictEqual(err, null)
})
// process.exit()

// log('##################')
// log('###################')
