/* eslint no-unused-vars: "off" */
/* eslint no-undef: "off" */
import {
  // fail,
  ok,
  // rejects,
  // strictEqual
} from 'node:assert'
import { test } from 'node:test'
import { readFile } from 'node:fs/promises'

import Pcall from '../src/index.js'

const { log } = console

const mkpromise = (s = 3, pass = true) => new Promise((res, rej) => setTimeout(() => { pass ? res('YOKK') : rej('nOPA')}, s * 1_000))

const line = (c = '═') => log(Array.from({ length: process.stdout.columns }, () => c).join(''))

log(Pcall)
line('_')


line('+')

test('---DEV--- [GOOD]', async () => {
  line('#')
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
