// import Pcall from '../src/index.js'

// import { describe, it, mock, test } from 'node:test'
// import assert from 'node:assert'

// const { debug } = console

// const cr8Promise = (pass, ...a) => new Promise((r, j) => (pass ? r : j)({ ok: 'donzo', a }))

// describe('TypeError', () => {
//   it('DIRECT ITERABLE', async () => {
//     const cr1 = cr8Promise(true, 'foo', 'bar')
//     const [err, res] = Pcall(cr8Promise(true, 'foo'), 'xXx', 'YyyyY')
//     debug({ cr1, err, res })
//   })
//
//   it('NOT DIRECT ITERABLE', async () => {
//     const cr1 = cr8Promise(true, 'foo', 'bar')
//     const pcall = new Pcall()
//     const x = pcall(cr8Promise(true, 'foo'), 'xXx', 'YyyyY')
//     const [err, res] = pcall(cr8Promise(true, 'foo'), 'xXx', 'YyyyY')
//     debug({ x, cr1, err, res })
//   })
// })
