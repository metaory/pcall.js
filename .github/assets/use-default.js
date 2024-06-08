import { readFile } from 'node:fs/promises'

import Pcall from 'pcall.js'

const { log } = console

const pcall = new Pcall({
  onSuccess: (args, res) => log({ res, args }, true),
  onFailure: (args, err) => log({ err, args }, false),
  transformOnSuccess: (args, res) => res,
  transformOnFailure: (args, err) => err,
  cleanup: () => {},
  noError: false,
  noTrace: false,
})

const path = 'test/sample-good.json'
const opts = { encoding: 'utf8' }

const [err, res] = await pcall(readFile, path, opts)

log({ err, res })
