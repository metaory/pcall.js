import {
  // fail,
  ok,
  // rejects,
  // strictEqual
} from 'node:assert'
import { test } from 'node:test'
// import { readFile } from 'node:fs/promises'

import Pcall from '../src/index.js'

const { log } = console

const line = (c = '═') => log(Array.from({ length: process.stdout.columns }, () => c).join(''))

log(Pcall)
line('_')

const wait = (s = 1, signal) =>
  new Promise(resolve => setTimeout(() => resolve(`okk after ${s}s`), s * 1_000))

line('+')

test('---DEV-------- [GOOD]', async () => {
  line('#')
  const pcall = new Pcall({
    timeout: 2,
    onSuccess: (args, res) => {
      console.log('CUSTOM onSuccess handler', { args, res })
    },
  })
  log('pcall', pcall)
  const [err, res] = await pcall(wait, 7)
  log('@DEV::', { err, res }, '::')
  ok(res)
})
// process.exit()

// log('##################')
// log('###################')
