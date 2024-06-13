/* eslint no-unused-vars: "off" */
/* eslint no-undef: "off" */
import {
  // fail,
  // ok,
  // rejects,
  strictEqual,
} from 'node:assert'
import { test } from 'node:test'
import { readFile } from 'node:fs/promises'

import Pcall from '../src/index.js'

const { log } = console

const line = (c = '═') => log(Array.from({ length: process.stdout.columns }, () => c).join(''))

log(Pcall)
line('_')

// const mkpromise = (s = 3, pass = true) => new Promise((res, rej) => setTimeout(pass ? res : rej, s * 1_000))

line('+')

const names = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'lightGray',
  null,
  'default',
]

const FG = [...Array(8).keys()].map(x => `\x1b[3${x}m`)
const BG = [...Array(8).keys()].map(x => `\x1b[4${x}m`)
const BD = '\x1b[1m'
const RS = '\x1b[0m'

log(FG[0])
test('---STATIC--- [GOOD]', async () => {
  line('#')
  const path = 'test/sample-good.json'
  const opts = { encoding: 'utf8' }
  const [err, res] = await Pcall(readFile, path, opts)
  log('@STATIC::', res, '::')
  log('>>', { err, res }, '<<<')
  strictEqual(err, false)
})

test('---INSTANCE--- [GOOD]', async () => {
  line('#')
  const path = 'test/sample-good.json'
  const opts = { encoding: 'utf8' }
  const pcall = new Pcall({
    onSuccess: (args, res) => {
      console.log('CUSTOM onSuccess handler', { args, res })
    },
    onFailure: 'foo',
  })
  log('pcall', pcall)
  const [err, res] = await pcall(readFile, path, opts)
  log('@INSTANCE::', { err, res }, '::')
  strictEqual(err, false)
})
// process.exit()

// log('##################')
// log('###################')