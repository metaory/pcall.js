/* eslint no-unused-vars: "off" */

import { readFile } from 'node:fs/promises'
import Pcall from 'pcall.js'

const path = './package.json'
const opts = { encoding: 'utf8' }

const pcall = new Pcall({
  onSuccess: (args, res) => {
    /*·🔹·*/
  },
  onFailure: (args, err) => {
    /*·🔹·*/
  },
  transformOnSuccess: (args, res) => {
    /*·🚧·*/
  },
  transformOnFailure: (args, err) => {
    /*·🚧·*/
  },
  cleanup: args => {
    /*·🔹·*/
  },
  trace: true,
})

const [err, res] = await pcall(readFile, path, opts)

console.log('err', '::', err)
console.log('res', '::', res)
