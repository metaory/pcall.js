/* eslint no-unused-vars: "off" */
/* eslint no-undef: "off" */
import { ok, } from 'node:assert'
import { test } from 'node:test'
import { readFile } from 'node:fs/promises'

import { sep, mkPromise } from './test-util.js'
import Pcall from '../src/index.js'

const { log } = console

const sep = (c = '═') => log(Array.from({ length: process.stdout.columns }, () => c).join(''))

log(Pcall)
sep('_')


sep('+')

test('---DEV--- [GOOD]', async () => {
  sep('#')
  const path = 'test/sample-good.json'
  const opts = { encoding: 'utf8' }
  const pcall = new Pcall({
    // onSuccess: (args, res) => {
    //   console.log('CUSTOM onSuccess handler', {args, res})
    // },
    // onFailure: 'foo',
  })
  log('pcall', pcall)
  // const [err, res] = await pcall(readFile, path, opts)
  const [err, res] = await pcall(mkpromise, 4, false)
  log('@DEV::', {err, res} , '::')
  ok(res)
})
// process.exit()

// log('##################')
// log('###################')
