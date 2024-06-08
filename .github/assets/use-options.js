import { readFile } from 'node:fs/promises'

import Pcall from 'pcall.js'

const readJson = new Pcall({
  fn: readFile,
  noError: true,
  args: [{ encoding: 'utf8' }],
  transformOnSuccess: (args, res) => JSON.parse(res),
  transformOnFailure: (args, err) => err.message,
})

const path = 'test/sample-good.json'

const res = await readJson(path)

console.log(res.name)
