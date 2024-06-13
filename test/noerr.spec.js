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

const line = (c = '═') => log(Array.from({ length: process.stdout.columns }, () => c).join(''))

log(Pcall)
line('_')


line('+')

test('---NO_ERROR--- [GOOD]', async () => {
  line('#')
  const path = 'test/sample-good.json'
  const opts = { encoding: 'utf8' }
  const pcall = new Pcall({
    noError: true,
    onSuccess: (args, res) => {
      console.log('CUSTOM onSuccess handler', {args, res})
    },
    onFailure: 'foo',
  })
  log('pcall', pcall)
  const res = await pcall(readFile, path, opts)
  log('@NO_ERROR::', res , '::')
  ok(res)
})
// process.exit()

// log('##################')
// log('###################')
