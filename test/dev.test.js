import {
  describe,
  it,
  // mock,
  // test
} from 'node:test'
// import assert from 'node:assert'
import Pcall from '../src/index.js'

const { log: l } = console

const job = (name, family) => new Promise(resolve => resolve(`Hi ${name} :: ${family} !`))

l('╶─ ╴╶ ╴╶ ╴╶ ╴╶ ╴╶ ─╴')

describe('ASYNC CALLS', () => {
  it('CLASS', async () => {
    const res = await Pcall(job, 'zed', 'hoge')
    l({ Pcall, res })
  })

  l('╶─ ╴╶ ╴╶ ╴╶ ╴╶ ╴╶ ─╴')

  it('CTOR', async () => {
    const pcall = new Pcall()
    const res = await pcall(job, 'zed', 'hoge')
    l({ Pcall, pcall, res })
  })

  l('╶─ ╴╶ ╴╶ ╴╶ ╴╶ ╴╶ ─╴')

  it('CTOR WITH OPTIONS', async () => {
    // const sleep = (s = 1) => new Promise(r => setTimeout(r, s * 1_000))
    const onSuccess = (args, res) => l('onSuccess::', { args, res })
    const onFailure = (args, err) => l('onFailure::', { args, err })
    const pcall = new Pcall({ onSuccess, onFailure, trace: false })
    const res = await pcall(job, 'zed', 'hoge')
    l({ pcall, res })
  })

  l('╶─ ╴╶ ╴╶ ╴╶ ╴╶ ╴╶ ─╴')

  it('CTOR WITH OPTIONS', async () => {
    const pcall = new Pcall()
    const res = await pcall(job, 'zed', 'hoge')
    l({ pcall, res })
  })
})

l('░░░░░░░░░░░░░░░░░░░░░', '\n')

describe('SYNC CALLS', () => {
  it('CLASS', async () => {
    const res = Pcall(job, 'zed', 'hoge')
    l({ Pcall, res })
  })

  l('╶─ ╴╶ ╴╶ ╴╶ ╴╶ ╴╶ ─╴')

  it('CTOR', async () => {
    const pcall = new Pcall()
    const res = pcall(job, 'zed', 'hoge')
    l({ Pcall, pcall, res })
  })

  l('╶─ ╴╶ ╴╶ ╴╶ ╴╶ ╴╶ ─╴')

  it('CTOR WITH OPTIONS', () => {
    // const sleep = (s = 1) => new Promise(r => setTimeout(r, s * 1_000))
    const onSuccess = (args, res) => l('onSuccess::', { args, res })
    const onFailure = (args, err) => l('onFailure::', { args, err })
    const pcall = new Pcall({ onSuccess, onFailure, trace: false })
    const res = pcall(job, 'zed', 'hoge')
    l({ pcall, res })
  })
})
