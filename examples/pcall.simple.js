/* eslint no-unused-vars: "off" */

import { readFile } from 'node:fs/promises'
import Pcall from 'pcall.js'

const path = './package.json'
const opts = { encoding: 'utf8' }

const [err, res] = await Pcall(readFile, path, opts)

console.log('err', '::', err)
console.log('res', '::', res)
