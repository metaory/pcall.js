import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { strictEqual } from 'node:assert'

import Pcall from '../src/index.js'

const { log } = console

test('COMPLETE options instance call to resolve AsyncFunction [GOOD]', async () => {
  const pcall = new Pcall({
    onSuccess: (args, res) => log({ res, args }, true),
    onFailure: (args, err) => log({ err, args }, false),
    transformOnSuccess: (args, res) => res,
    transformOnFailure: (args, res) => res,
    cleanup: () => {},
    noError: false,
    noTrace: false,
  })

  const path = 'test/sample-good.json'
  const opts = { encoding: 'utf8' }

  const [err, res] = await pcall(readFile, path, opts)

  log(':Pcall:[GOOD]:err<<', err, '>>')
  log(':Pcall:[GOOD]:res<<', res, '>>')

  strictEqual(err, false)
  strictEqual(typeof res, 'string')
})

test('instance call to resolve PRESET AsyncFunction [GOOD]', async () => {
  const safeJson = new Pcall({
    fn: readFile,
    args: [{ encoding: 'utf8' }],
    transformOnSuccess: (args, res) => JSON.parse(res),
    transformOnFailure: (args, { name, message }) => ({ name, message }),
    noError: false,
  })

  const path = './test/sample-good.json'

  const [err, res] = await safeJson(path)

  log(':Pcall:[GOOD]:err<<', err, '>>')
  log(':Pcall:[GOOD]:res<<', res, '>>')

  strictEqual(err, false)
  strictEqual(res.hogo, 'fuga')
})
