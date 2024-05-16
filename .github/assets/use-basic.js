import { readFile } from 'node:fs/promises'

import Pcall from 'pcall.js'

const path = 'README.md'
const opts = { encoding: 'utf8' }

const [err, res] = await Pcall(readFile, path, opts)

console.log({ err, res })
