/* eslint no-unused-vars: "off" */
import test from 'node:test'
import assert from 'node:assert'
import Pcall from '../src/index.js'

import { readFile } from 'node:fs/promises'

const { log: l } = console

const job = (name, family) =>
  new Promise(resolve =>
    resolve(`Hi ${name} :: ${family} !`)
  )

test('simple', async () => {
  // const filePath = '../../package.json'
  // import Pcall from 'pcall.js'
  const filePath = './package.json'
  const readOpts = { encoding: 'utf8' }
  const [err, res] = await Pcall(
    readFile,
    filePath,
    readOpts
  )

  console.error('Pcall [ERR]:', err)
  console.error('Pcall [RES]:', res)
  assert.ok(res)
})

test('advance', async () => {
  const filePath = '../../package.json'
  const readOpts = { encoding: 'utf8' }

  const pcall = new Pcall({
    onSuccess: (args, res) => {
      /*···*/
    },
    onFailure: (args, err) => {
      /*···*/
    },
    transformOnSuccess: (args, res) => {
      /*·🚧·*/
    },
    transformOnFailure: (args, err) => {
      /*·🚧·*/
    },
    cleanup: args => {
      /*···*/
    },
    trace: true,
  })

  const [err, res] = await pcall(
    readFile,
    filePath,
    readOpts
  )
  console.error('Pcall [ERR]:', err)
  console.error('Pcall [RES]:', res)
  assert.ok(res)
})
