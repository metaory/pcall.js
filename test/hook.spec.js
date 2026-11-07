import { deepEqual, equal, ok } from 'node:assert/strict'
import { test } from 'node:test'

import Pcall from '../src/index.js'

const quiet = {
  timeout: 0,
  onSuccess() {},
  onFailure() {},
  onFinally() {},
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

test('success calls onSuccess only', async () => {
  const seen = []
  const calls = []
  const pcall = new Pcall({
    ...quiet,
    onSuccess: (res, call) => {
      seen.push(['ok', res])
      calls.push(call)
    },
    onFailure: err => seen.push(['no', err]),
  })
  const add = async (a, b) => a + b
  const [err, res] = await pcall(add, 2, 3)
  equal(err, null)
  equal(res, 5)
  deepEqual(seen, [['ok', 5]])
  equal(calls[0].name, 'add')
  equal(calls[0].error, null)
  ok(calls[0].ms >= 0)
  deepEqual(calls[0].args, [2, 3])
})

test('outcome hooks see the function duration', async () => {
  const seen = []
  const pcall = new Pcall({
    ...quiet,
    onSuccess: (_res, call) => seen.push(call.ms),
    onFailure: (_err, call) => seen.push(call.ms),
  })
  await pcall(async () => {
    await wait(40)
    return 'ok'
  })
  const [err] = await pcall(async () => {
    await wait(40)
    throw new Error('nope')
  })
  equal(err.message, 'nope')
  ok(seen[0] >= 30)
  ok(seen[1] >= 30)
})

test('rejection calls onFailure only', async () => {
  const seen = []
  const calls = []
  const pcall = new Pcall({
    ...quiet,
    onSuccess: res => seen.push(['ok', res]),
    onFailure: (err, call) => {
      seen.push(['no', err])
      calls.push(call)
    },
  })
  const boom = async () => {
    throw new Error('nope')
  }
  const [err, res] = await pcall(boom)
  equal(res, null)
  equal(err.message, 'nope')
  deepEqual(seen, [['no', err]])
  equal(calls[0].error, err)
  equal(calls[0].name, 'boom')
})

test('concurrent calls keep their own name and duration', async () => {
  const seen = []
  const pcall = new Pcall({
    ...quiet,
    onFinally: (_args, _name, _span, call) => seen.push({ name: call.name, ms: call.ms }),
  })
  const fast = async () => 'fast'
  const slow = async () => {
    await wait(50)
    return 'slow'
  }
  const [slowResult, fastResult] = await Promise.all([pcall(slow), pcall(fast)])
  const byName = Object.fromEntries(seen.map(row => [row.name, row]))
  equal(fastResult[0], null)
  equal(fastResult[1], 'fast')
  equal(slowResult[0], null)
  equal(slowResult[1], 'slow')
  equal(byName.fast.name, 'fast')
  equal(byName.slow.name, 'slow')
  ok(byName.slow.ms >= 40)
  ok(byName.fast.ms < byName.slow.ms)
})

test('sync throw returns a tuple', async () => {
  const boom = () => {
    throw new Error('sync')
  }
  const [err, res] = await new Pcall(quiet)(boom)
  equal(res, null)
  equal(err.message, 'sync')
})

test('timeout 0 lets a slow function finish', async () => {
  const [err, res] = await new Pcall(quiet)(async () => {
    await wait(30)
    return 'done'
  })
  equal(err, null)
  equal(res, 'done')
})

test('a positive timeout wins without stopping the function', async () => {
  const state = { settled: false }
  const [err, res] = await new Pcall({ ...quiet, timeout: 20 })(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          state.settled = true
          resolve('late')
        }, 80)
      }),
  )
  equal(res, null)
  equal(err.name, 'TimeoutError')
  equal(state.settled, false)
  await wait(90)
  equal(state.settled, true)
})

test('default onFinally logs name and span, and a custom one still receives args', async () => {
  const lines = []
  const debug = console.debug
  const info = console.info
  console.debug = (...parts) => lines.push(parts.map(String).join(' '))
  console.info = () => {}
  const hiddenFn = () => {}
  try {
    const [err, res] = await Pcall(async function named() {
      return 'ok'
    }, hiddenFn)
    equal(err, null)
    equal(res, 'ok')
  } finally {
    console.debug = debug
    console.info = info
  }
  const text = lines.join('\n')
  ok(text.includes('@onFinally named'))
  ok(text.endsWith('s'))
  ok(!text.includes('[Function'))
  ok(!text.includes('hiddenFn'))
  const seen = []
  const pcall = new Pcall({
    ...quiet,
    onFinally: args => seen.push(args),
  })
  await pcall(async value => value, hiddenFn)
  deepEqual(seen, [[hiddenFn]])
})

test('onFinally does not mutate args', async () => {
  const seen = {}
  const pcall = new Pcall({
    ...quiet,
    onFinally: args => {
      seen.args = args
    },
  })
  await pcall(async value => value, { keep: true })
  equal(seen.args.name, undefined)
  deepEqual(seen.args, [{ keep: true }])
})

test('onSuccess throw leaves the success tuple', async () => {
  const seen = []
  const pcall = new Pcall({
    ...quiet,
    onSuccess: () => {
      throw new Error('hook')
    },
    onFailure: () => seen.push('no'),
  })
  const [err, res] = await pcall(async () => 'value')
  equal(err, null)
  equal(res, 'value')
  deepEqual(seen, [])
})
