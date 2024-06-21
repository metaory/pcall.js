/* eslint no-unused-vars: "off" */
/* eslint no-undef: "off" */
import { ok, } from 'node:assert'
import { test } from 'node:test'
import { readFile } from 'node:fs/promises'

import { sep, mkPromise } from './test-util.js'
import Pcall from '../src/index.js'

const { clear, debug, info, log, log: l, trace } = console

const path = 'test/sample-good.json'
const opts = { encoding: 'utf8' }

sep('#')
const CASE = 'TIMEOUT'

test(`-${CASE} EXPECT [FAIL:TimeoutError]`, async () => {
  const expect = 'FAIL'
  const timeout = 2_000
  const msg = `Expected: ${C6}${expect}${C0}`

  const pcall = new Pcall({
    onSuccess: console.info,
    onFailure: err => console.error(err.message),
    onFinally: () =>
      console.info(
        `${C3}@onFinally${C0}${msg}`,
        `DUE TO ${C3}${CASE}${C0}`,
        'WAS SET TO TIMEOUT IN',
        timeout
      ),
    timeout,
  })
  const [err, res] = await pcall(mkPromise, timeout, expect === 'PASS')

  log(C4, 'RES::', { err, res }, '::', C0)

  ok(res)
})
// process.exit()

// log('##################')
// log('###################')
