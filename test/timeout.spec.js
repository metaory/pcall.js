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

import C from './util.js'

const { log } = console
log(Fg)
log('foo', C.f1('fo'), 'zz')
process.exit()
log(Pcall)

const mkpromise = (s = 3, pass = true) =>
  new Promise(
    (res, rej) =>
      log(`to pass: ${pass} in ${s}`) &&
      setTimeout(() => {
        ;({ true: res, false: rej })[pass]({ feeling: 'YOKK', after: `${s}s`, pass_expected: pass })
      }, s * 1_000)
  )

const line = (c = '═') => log(Array.from({ length: process.stdout.columns }, () => c).join(''))

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
  log('@DEV::', { err, res }, '::')
  ok(res)
})
// process.exit()

// log('##################')
// log('###################')
